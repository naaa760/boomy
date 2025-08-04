"use client";

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { authClient } from "~/lib/auth-client";

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authClient.getSession();
        // If no session and on dashboard, redirect to landing page
        if (!session && pathname?.startsWith("/dashboard")) {
          router.replace("/");
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    void checkSession();
  }, [pathname, router]);

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={(url) => router.push(url)}
      replace={(url) => router.replace(url)}
      onSessionChange={() => {
        // Clear router cache and trigger re-render
        router.refresh();
        // Force a page refresh to update navbar
        window.location.reload();
      }}
      Link={Link}
    >
      {children}
    </AuthUIProvider>
  );
}
