"use client";

import Link from "next/link";
import { Music, ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Navbar } from "~/components/navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div
        className="min-h-screen bg-black bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <div className="mx-auto max-w-7xl px-4 pt-32 pb-0 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Headline */}
            <div className="mb-2 flex items-center justify-center gap-8">
              <h1
                className="animate-fade-in text-center text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                style={{
                  fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                  fontSize: "clamp(32px, 5vw, 58px)",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.2",
                  fontWeight: "300",
                  animation: "fadeInUp 1.2s ease-out forwards",
                }}
              >
                <span
                  className="animate-slide-up block"
                  style={{
                    animationDelay: "0.2s",
                    animation: "slideUp 0.8s ease-out 0.2s forwards",
                  }}
                >
                  The New Standard for
                </span>
                <span
                  className="animate-slide-up mt-4 block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
                  style={{
                    animationDelay: "0.4s",
                    animation: "slideUp 0.8s ease-out 0.4s forwards",
                  }}
                >
                  Music Creation
                </span>
              </h1>

              {/* Head Image */}
              <img
                src="/head.png"
                alt="Head decoration"
                className="animate-fade-in h-32 w-32 object-contain md:h-40 md:w-40"
                style={{ animation: "fadeIn 1s ease-out 0.6s forwards" }}
              />
            </div>

            {/* Description */}
            <p
              className="animate-fade-in mx-auto mb-2 max-w-3xl text-center text-white/90 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]"
              style={{
                fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                fontSize: "16px",
                letterSpacing: "0.05em",
                lineHeight: "22px",
                fontWeight: "300",
                animation: "fadeInUp 1s ease-out 0.8s forwards",
              }}
            >
              Meet the first true end-to-end AI music platform. Generate tracks,
              create playlists, collaborate with artists, and more.
            </p>

            {/* Call-to-Action Buttons */}
            <div
              className="animate-fade-in flex items-center justify-center gap-x-4"
              style={{ animation: "fadeInUp 1s ease-out 1s forwards" }}
            >
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  className="rounded-full bg-black px-6 py-3 text-base font-normal text-gray-300 hover:bg-gray-800"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  className="rounded-full bg-gray-300 px-6 py-3 text-base font-normal text-black hover:bg-gray-100"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>

            {/* Horn Image */}
            <div
              className="animate-fade-in flex justify-center"
              style={{ animation: "fadeInUp 1s ease-out 1.2s forwards" }}
            >
              <img
                src="/horn.png"
                alt="Horn decoration"
                className="h-56 w-56 object-contain opacity-80 md:h-64 md:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          opacity: 0;
        }

        .animate-slide-up {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
