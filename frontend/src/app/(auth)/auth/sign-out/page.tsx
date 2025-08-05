"use client";

import { useEffect } from "react";
import { authClient } from "~/lib/auth-client";
import { Loader2 } from "lucide-react";

export default function SignOutPage() {
  useEffect(() => {
    const handleSignOut = async () => {
      try {
        // Sign out from BetterAuth
        await authClient.signOut();

        // Clear all storage
        localStorage.clear();
        sessionStorage.clear();

        // Clear all cookies
        const cookies = document.cookie.split(";");
        for (const cookie of cookies) {
          if (cookie) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie =
              name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
          }
        }

        // Force a complete browser cache clear and reload
        window.location.replace("/");
      } catch (error) {
        console.error("Sign out error:", error);
        // Force reload anyway
        localStorage.clear();
        sessionStorage.clear();
        window.location.replace("/");
      }
    };

    void handleSignOut();
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
        <p className="text-muted-foreground">Signing out...</p>
      </div>
    </div>
  );
}
