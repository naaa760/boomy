import Link from "next/link";
import { Music, ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Navbar } from "~/components/navbar";

export default function LandingPage() {
  return (
    <div
      className="min-h-screen bg-black bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <Navbar />

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-0 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline */}
          <div className="mb-2 flex items-center justify-center gap-8">
            <h1
              className="text-center text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              style={{
                fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                fontSize: "clamp(32px, 5vw, 58px)",
                letterSpacing: "-0.02em",
                lineHeight: "1.2",
                fontWeight: "300",
              }}
            >
              The New Standard for
              <span className="mt-4 block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Music Creation
              </span>
            </h1>

            {/* Head Image */}
            <img
              src="/head.png"
              alt="Head decoration"
              className="h-32 w-32 object-contain md:h-40 md:w-40"
            />
          </div>

          {/* Description */}
          <p
            className="mx-auto mb-2 max-w-3xl text-center text-white/90 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]"
            style={{
              fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
              fontSize: "16px",
              letterSpacing: "0.05em",
              lineHeight: "22px",
              fontWeight: "300",
            }}
          >
            Meet the first true end-to-end AI music platform. Generate tracks,
            create playlists, collaborate with artists, and more.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex items-center justify-center gap-x-4">
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
          <div className="flex justify-center">
            <img
              src="/horn.png"
              alt="Horn decoration"
              className="h-56 w-56 object-contain opacity-80 md:h-64 md:w-64"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
