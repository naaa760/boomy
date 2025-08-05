import { Music } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPresignedUrl } from "~/actions/generation";
import { SongCard } from "~/components/home/song-card";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const songs = await db.song.findMany({
    where: {
      published: true,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
      categories: true,
      likes: session.user.id
        ? {
            where: {
              userId: session.user.id,
            },
          }
        : false,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });

  const songsWithUrls = await Promise.all(
    songs.map(async (song) => {
      const thumbnailUrl = song.thumbnailS3Key
        ? await getPresignedUrl(song.thumbnailS3Key)
        : null;

      return { ...song, thumbnailUrl };
    }),
  );

  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const trendingSongs = songsWithUrls
    .filter((song) => song.createdAt >= twoDaysAgo)
    .slice(0, 10);

  const trendingSongIds = new Set(trendingSongs.map((song) => song.id));

  const categorizedSongs = songsWithUrls
    .filter(
      (song) => !trendingSongIds.has(song.id) && song.categories.length > 0,
    )
    .reduce(
      (acc, song) => {
        const primaryCategory = song.categories[0];
        if (primaryCategory) {
          acc[primaryCategory.name] ??= [];
          if (acc[primaryCategory.name]!.length < 10) {
            acc[primaryCategory.name]!.push(song);
          }
        }
        return acc;
      },
      {} as Record<string, Array<(typeof songsWithUrls)[number]>>,
    );

  if (
    trendingSongs.length === 0 &&
    Object.keys(categorizedSongs).length === 0
  ) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <div className="bg-muted/50 rounded-full p-6">
          <Music className="text-muted-foreground h-12 w-12" />
        </div>
        <h1 className="font-display text-foreground mt-6 text-2xl font-bold tracking-tight">
          No Music Here
        </h1>
        <p className="font-body text-muted-foreground mt-3 max-w-md text-base">
          There are no published songs available right now. Check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-foreground text-4xl font-bold tracking-tight">
          Discover Music
        </h1>
        <p className="font-body text-muted-foreground mt-2 text-lg">
          Explore trending tracks and discover new music
        </p>
      </div>

      {/* Trending songs */}
      {trendingSongs.length > 0 && (
        <div className="mb-12">
          <h2 className="font-display text-foreground mb-6 text-2xl font-semibold tracking-tight">
            Trending
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {trendingSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {Object.entries(categorizedSongs)
        .slice(0, 5)
        .map(([category, songs]) => (
          <div key={category} className="mb-12">
            <h2 className="font-display text-foreground mb-6 text-2xl font-semibold tracking-tight">
              {category}
            </h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {songs.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
