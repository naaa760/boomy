"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function Upgrade() {
  const router = useRouter();

  const upgrade = () => {
    router.push("/customer-portal");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="font-caption border-border/50 bg-accent/30 text-foreground hover:bg-accent/50 hover:text-foreground h-9 rounded-lg px-4 text-sm font-medium transition-all duration-200"
      onClick={upgrade}
    >
      Upgrade
    </Button>
  );
}
