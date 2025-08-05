"use client";

import {
  Download,
  Loader2,
  MoreHorizontal,
  Music,
  Pencil,
  Play,
  RefreshCcw,
  Search,
  XCircle,
} from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { getPlayUrl } from "~/actions/generation";
import { Badge } from "../ui/badge";
import { renameSong, setPublishedStatus } from "~/actions/song";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { RenameDialog } from "./rename-dialog";
import { useRouter } from "next/navigation";
import { usePlayerStore } from "~/stores/use-player-store";

export interface Track {
  id: string;
  title: string | null;
  createdAt: Date;
  instrumental: boolean;
  prompt: string | null;
  lyrics: string | null;
  describedLyrics: string | null;
  fullDescribedSong: string | null;
  thumbnailUrl: string | null;
  playUrl: string | null;
  status: string | null;
  createdByUserName: string | null;
  published: boolean;
}

export function TrackList({ tracks }: { tracks: Track[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadingTrackId, setLoadingTrackId] = useState<string | null>(null);
  const [trackToRename, setTrackToRename] = useState<Track | null>(null);
  const router = useRouter();
  const setTrack = usePlayerStore((state) => state.setTrack);

  const handleTrackSelect = async (track: Track) => {
    if (loadingTrackId) return;
    setLoadingTrackId(track.id);
    const playUrl = await getPlayUrl(track.id);
    setLoadingTrackId(null);

    setTrack({
      id: track.id,
      title: track.title,
      url: playUrl,
      artwork: track.thumbnailUrl,
      prompt: track.prompt,
      createdByUserName: track.createdByUserName,
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const filteredTracks = tracks.filter(
    (track) =>
      track.title?.toLowerCase().includes(searchQuery.toLowerCase()) ??
      track.prompt?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="bg-background flex flex-1 flex-col overflow-y-scroll">
      <div className="flex-1 px-8 py-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your tracks..."
              className="font-body border-border/30 bg-background rounded-xl pl-10"
            />
          </div>
          <Button
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="font-caption border-border/30 bg-background hover:bg-accent/30 h-9 rounded-lg"
          >
            {isRefreshing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="mr-2 h-4 w-4" />
            )}
            Refresh
          </Button>
        </div>

        {/* Track list */}
        <div className="space-y-3">
          {filteredTracks.length > 0 ? (
            filteredTracks.map((track) => {
              switch (track.status) {
                case "failed":
                  return (
                    <div
                      key={track.id}
                      className="border-border/30 bg-background flex cursor-not-allowed items-center gap-4 rounded-xl border p-4"
                    >
                      <div className="bg-destructive/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                        <XCircle className="text-destructive h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-caption text-destructive truncate text-sm font-medium">
                          Generation failed
                        </h3>
                        <p className="font-body text-muted-foreground truncate text-xs">
                          Please try creating the song again.
                        </p>
                      </div>
                    </div>
                  );

                case "no credits":
                  return (
                    <div
                      key={track.id}
                      className="border-border/30 bg-background flex cursor-not-allowed items-center gap-4 rounded-xl border p-4"
                    >
                      <div className="bg-destructive/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                        <XCircle className="text-destructive h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-caption text-destructive truncate text-sm font-medium">
                          Not enough credits
                        </h3>
                        <p className="font-body text-muted-foreground truncate text-xs">
                          Please purchase more credits to generate this song.
                        </p>
                      </div>
                    </div>
                  );

                case "queued":
                case "processing":
                  return (
                    <div
                      key={track.id}
                      className="border-border/30 bg-background flex cursor-not-allowed items-center gap-4 rounded-xl border p-4"
                    >
                      <div className="bg-muted flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                        <Loader2 className="text-muted-foreground h-5 w-5 animate-spin" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-caption text-muted-foreground truncate text-sm font-medium">
                          Processing song...
                        </h3>
                        <p className="font-body text-muted-foreground truncate text-xs">
                          Refresh to check the status.
                        </p>
                      </div>
                    </div>
                  );

                default:
                  return (
                    <div
                      key={track.id}
                      className="group border-border/30 bg-background hover:border-border hover:bg-accent/30 flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all duration-200"
                      onClick={() => handleTrackSelect(track)}
                    >
                      {/* Thumbnail */}
                      <div className="group relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg">
                        {track.thumbnailUrl ? (
                          <img
                            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                            src={track.thumbnailUrl}
                            alt={track.title ?? "Track"}
                          />
                        ) : (
                          <div className="bg-muted flex h-full w-full items-center justify-center rounded-lg">
                            <Music className="text-muted-foreground h-5 w-5" />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all duration-200 group-hover:opacity-100">
                          {loadingTrackId === track.id ? (
                            <Loader2 className="animate-spin text-white" />
                          ) : (
                            <Play className="fill-white text-white" />
                          )}
                        </div>
                      </div>

                      {/* Track info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-caption text-foreground truncate text-sm font-medium">
                            {track.title}
                          </h3>
                          {track.instrumental && (
                            <Badge
                              variant="outline"
                              className="font-caption text-xs"
                            >
                              Instrumental
                            </Badge>
                          )}
                        </div>
                        <p className="font-body text-muted-foreground truncate text-xs">
                          {track.prompt}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={async (e) => {
                            e.stopPropagation();
                            await setPublishedStatus(
                              track.id,
                              !track.published,
                            );
                          }}
                          variant="outline"
                          size="sm"
                          className={`font-caption border-border/30 bg-background hover:bg-accent/30 cursor-pointer rounded-lg text-xs ${
                            track.published ? "border-red-200 text-red-600" : ""
                          }`}
                        >
                          {track.published ? "Unpublish" : "Publish"}
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hover:bg-accent/30 h-8 w-8 rounded-lg"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                              onClick={async (e) => {
                                e.stopPropagation();
                                const playUrl = await getPlayUrl(track.id);
                                window.open(playUrl, "_blank");
                              }}
                              className="font-caption"
                            >
                              <Download className="mr-2 h-4 w-4" /> Download
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={async (e) => {
                                e.stopPropagation();
                                setTrackToRename(track);
                              }}
                              className="font-caption"
                            >
                              <Pencil className="mr-2 h-4 w-4" /> Rename
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
              }
            })
          ) : (
            <div className="flex flex-col items-center justify-center pt-20 text-center">
              <div className="bg-muted/30 rounded-full p-6">
                <Music className="text-muted-foreground h-8 w-8" />
              </div>
              <h2 className="font-display text-foreground mt-6 text-lg font-semibold tracking-tight">
                No Music Yet
              </h2>
              <p className="font-body text-muted-foreground mt-2 max-w-sm text-sm">
                {searchQuery
                  ? "No tracks match your search."
                  : "Create your first song to get started."}
              </p>
            </div>
          )}
        </div>
      </div>

      {trackToRename && (
        <RenameDialog
          track={trackToRename}
          onClose={() => setTrackToRename(null)}
          onRename={(trackId, newTitle) => renameSong(trackId, newTitle)}
        />
      )}
    </div>
  );
}
