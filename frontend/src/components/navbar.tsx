"use client";

import Link from "next/link";
import { Music, Home } from "lucide-react";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    void checkAuth();
  }, []);

  if (isLoading) {
    return (
      <nav className="fixed top-4 left-1/2 z-50 mx-4 w-full max-w-2xl -translate-x-1/2 transform rounded-lg border border-white/5 bg-black/10 backdrop-blur-md">
        <div className="px-6 sm:px-8 lg:px-10">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Music className="h-6 w-6 text-gray-300" />
              <span className="text-lg font-bold text-gray-300">Boomy</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-16 animate-pulse rounded-lg bg-gray-300/20"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-4 left-1/2 z-50 mx-4 w-full max-w-2xl -translate-x-1/2 transform rounded-lg border border-white/5 bg-black/10 backdrop-blur-md">
      <div className="px-6 sm:px-8 lg:px-10">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Music className="h-6 w-6 text-gray-300" />
            <span className="text-lg font-bold text-gray-300">Boomy</span>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="rounded-lg text-gray-300 hover:bg-white/10"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/auth/sign-out">
                  <Button className="rounded-lg bg-gray-300 px-4 py-2 text-sm text-black hover:bg-gray-200">
                    Sign Out
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/sign-in">
                  <Button
                    variant="ghost"
                    className="rounded-lg text-gray-300 hover:bg-white/10"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button className="rounded-lg bg-gray-300 text-black hover:bg-white/90">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
