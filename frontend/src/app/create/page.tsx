import { Loader2 } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SongPanel } from "~/components/create/song-panel";
import TrackListFetcher from "~/components/create/track-list-fetcher";
import { auth } from "~/lib/auth";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="flex h-full flex-col lg:flex-row">
      <SongPanel />
      <Suspense
        fallback={
          <div className="bg-background flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-muted/50 rounded-full p-4">
                <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
              </div>
              <p className="font-body text-muted-foreground text-sm">
                Loading your tracks...
              </p>
            </div>
          </div>
        }
      >
        <TrackListFetcher />
      </Suspense>
    </div>
  );
}
