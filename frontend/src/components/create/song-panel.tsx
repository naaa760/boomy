"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2, Music, Plus } from "lucide-react";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { generateSong, type GenerateRequest } from "~/actions/generation";

const inspirationTags = [
  "80s synth-pop",
  "Acoustic ballad",
  "Epic movie score",
  "Lo-fi hip hop",
  "Driving rock anthem",
  "Summer beach vibe",
];

const styleTags = [
  "Industrial rave",
  "Heavy bass",
  "Orchestral",
  "Electronic beats",
  "Funky guitar",
  "Soulful vocals",
  "Ambient pads",
];

export function SongPanel() {
  const [mode, setMode] = useState<"simple" | "custom">("simple");
  const [description, setDescription] = useState("");
  const [instrumental, setInstrumental] = useState(false);
  const [lyricsMode, setLyricsMode] = useState<"write" | "auto">("write");
  const [lyrics, setLyrics] = useState("");
  const [styleInput, setStyleInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStyleInputTagClick = (tag: string) => {
    const currentTags = styleInput
      .split(", ")
      .map((s) => s.trim())
      .filter((s) => s);

    if (!currentTags.includes(tag)) {
      if (styleInput.trim() === "") {
        setStyleInput(tag);
      } else {
        setStyleInput(styleInput + ", " + tag);
      }
    }
  };

  const handleInspirationTagClick = (tag: string) => {
    const currentTags = description
      .split(", ")
      .map((s) => s.trim())
      .filter((s) => s);

    if (!currentTags.includes(tag)) {
      if (description.trim() === "") {
        setDescription(tag);
      } else {
        setDescription(description + ", " + tag);
      }
    }
  };

  const handleCreate = async () => {
    if (mode === "simple" && !description.trim()) {
      toast.error("Please describe your song before creating.");
      return;
    }
    if (mode === "custom" && !styleInput.trim()) {
      toast.error("Please add some styles for your song.");
      return;
    }

    // Generate song
    let requestBody: GenerateRequest;

    if (mode === "simple") {
      requestBody = {
        fullDescribedSong: description,
        instrumental,
      };
    } else {
      const prompt = styleInput;
      if (lyricsMode === "write") {
        requestBody = {
          prompt,
          lyrics,
          instrumental,
        };
      } else {
        requestBody = {
          prompt,
          describedLyrics: lyrics,
          instrumental,
        };
      }
    }

    try {
      setLoading(true);
      await generateSong(requestBody);
      setDescription("");
      setLyrics("");
      setStyleInput("");
    } catch (error) {
      toast.error("Failed to generate song");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-border/30 bg-background flex w-full flex-col border-r lg:w-80">
      <div className="border-border/30 bg-background border-b px-8 py-8">
        <div>
          <h1 className="font-display text-foreground text-2xl font-bold tracking-tight">
            Create Music
          </h1>
          <p className="font-body text-muted-foreground mt-1 text-sm">
            Generate unique tracks with AI
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-8">
        <Tabs
          value={mode}
          onValueChange={(value) => setMode(value as "simple" | "custom")}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="simple" className="font-caption text-sm">
              Simple
            </TabsTrigger>
            <TabsTrigger value="custom" className="font-caption text-sm">
              Custom
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simple" className="space-y-8">
            <div className="space-y-4">
              <label className="font-caption text-foreground text-sm font-medium">
                Describe your song
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A dreamy lofi hip hop song, perfect for studying or relaxing"
                className="font-body border-border/30 bg-background min-h-[100px] resize-none rounded-xl"
              />
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMode("custom")}
                className="font-caption border-border/30 bg-background hover:bg-accent/30 h-8 rounded-lg text-xs"
              >
                <Plus className="mr-2 h-3 w-3" />
                Add Lyrics
              </Button>
              <div className="flex items-center gap-3">
                <label className="font-caption text-foreground text-sm font-medium">
                  Instrumental
                </label>
                <Switch
                  checked={instrumental}
                  onCheckedChange={setInstrumental}
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="font-caption text-foreground text-sm font-medium">
                Inspiration
              </label>
              <div className="w-full overflow-x-auto whitespace-nowrap">
                <div className="flex gap-2 pb-2">
                  {inspirationTags.map((tag) => (
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-caption border-border/30 bg-background hover:bg-accent/30 h-7 flex-shrink-0 rounded-lg text-xs"
                      key={tag}
                      onClick={() => handleInspirationTagClick(tag)}
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-caption text-foreground text-sm font-medium">
                  Lyrics
                </label>
                <div className="border-border/30 bg-background flex items-center gap-1 rounded-lg border p-1">
                  <Button
                    variant={lyricsMode === "auto" ? "secondary" : "ghost"}
                    onClick={() => {
                      setLyricsMode("auto");
                      setLyrics("");
                    }}
                    size="sm"
                    className="font-caption h-6 rounded-md text-xs"
                  >
                    Auto
                  </Button>
                  <Button
                    variant={lyricsMode === "write" ? "secondary" : "ghost"}
                    onClick={() => {
                      setLyricsMode("write");
                      setLyrics("");
                    }}
                    size="sm"
                    className="font-caption h-6 rounded-md text-xs"
                  >
                    Write
                  </Button>
                </div>
              </div>
              <Textarea
                placeholder={
                  lyricsMode === "write"
                    ? "Add your own lyrics here"
                    : "Describe your lyrics, e.g., a sad song about lost love"
                }
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                className="font-body border-border/30 bg-background min-h-[80px] resize-none rounded-xl"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="font-caption text-foreground text-sm font-medium">
                Instrumental
              </label>
              <Switch
                checked={instrumental}
                onCheckedChange={setInstrumental}
              />
            </div>

            <div className="space-y-4">
              <label className="font-caption text-foreground text-sm font-medium">
                Styles
              </label>
              <Textarea
                placeholder="Enter style tags"
                value={styleInput}
                onChange={(e) => setStyleInput(e.target.value)}
                className="font-body border-border/30 bg-background min-h-[50px] resize-none rounded-xl"
              />
              <div className="w-full overflow-x-auto whitespace-nowrap">
                <div className="flex gap-2 pb-2">
                  {styleTags.map((tag) => (
                    <Badge
                      variant="secondary"
                      key={tag}
                      className="font-caption hover:bg-secondary/30 flex-shrink-0 cursor-pointer rounded-md text-xs transition-colors duration-200"
                      onClick={() => handleStyleInputTagClick(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="border-border/30 bg-background border-t px-8 py-6">
        <Button
          onClick={handleCreate}
          disabled={loading}
          className="font-caption bg-foreground text-background hover:bg-foreground/90 w-full rounded-xl font-medium shadow-sm transition-all duration-200 hover:shadow-md"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Music className="mr-2 h-4 w-4" />
          )}
          {loading ? "Creating..." : "Create Song"}
        </Button>
      </div>
    </div>
  );
}
