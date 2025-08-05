"use client";

import type { Category, Like, Song } from "@prisma/client";
import { Heart, Loader2, Music, Play } from "lucide-react";
import { useState } from "react";
import { getPlayUrl } from "~/actions/generation";
import { toggleLikeSong } from "~/actions/song";
import { usePlayerStore } from "~/stores/use-player-store";

type SongWithRelation = Song & {
  user: { name: string | null };
  _count: {
    likes: number;
  };
  categories: Category[];
  thumbnailUrl?: string | null;
  likes?: Like[];
};

export function SongCard({ song }: { song: SongWithRelation }) {
  const [isLoading, setIsLoading] = useState(false);
  const setTrack = usePlayerStore((state) => state.setTrack);
  const [isLiked, setIsLiked] = useState(
    song.likes ? song.likes.length > 0 : false,
  );
  const [likesCount, setLikesCount] = useState(song._count.likes);

  const handlePlay = async () => {
    setIsLoading(true);
    const playUrl = await getPlayUrl(song.id);

    setTrack({
      id: song.id,
      title: song.title,
      url: playUrl,
      artwork: song.thumbnailUrl,
      prompt: song.prompt,
      createdByUserName: song.user.name,
    });

    setIsLoading(false);
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);

    await toggleLikeSong(song.id);
  };

  return (
    <div className="group">
      <div onClick={handlePlay} className="cursor-pointer">
        <div className="group bg-muted/50 relative aspect-square w-full overflow-hidden rounded-xl transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg">
          {song.thumbnailUrl ? (
            <img
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              src={song.thumbnailUrl}
              alt={song.title}
            />
          ) : (
            <div className="bg-muted flex h-full w-full items-center justify-center rounded-xl">
              <Music className="text-muted-foreground h-8 w-8" />
            </div>
          )}

          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-200 group-hover:scale-110">
              {isLoading ? (
                <Loader2 className="text-foreground h-6 w-6 animate-spin" />
              ) : (
                <Play className="fill-foreground text-foreground h-6 w-6" />
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="font-caption text-foreground line-clamp-2 text-sm leading-tight font-medium">
            {song.title}
          </h3>

          <p className="font-body text-muted-foreground text-xs">
            {song.user.name}
          </p>

          <div className="flex items-center justify-between">
            <span className="font-caption text-muted-foreground text-xs">
              {song.listenCount} listens
            </span>
            <button
              onClick={handleLike}
              className="flex cursor-pointer items-center gap-1.5 transition-colors duration-200 hover:text-red-500"
            >
              <Heart
                className={`h-4 w-4 transition-colors duration-200 ${
                  isLiked
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground"
                }`}
              />
              <span className="font-caption text-muted-foreground text-xs">
                {likesCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
