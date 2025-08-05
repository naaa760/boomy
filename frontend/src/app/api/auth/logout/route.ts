import { auth } from "~/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST() {
  try {
    // Sign out on the server side with proper headers
    await auth.api.signOut({
      headers: await headers(),
    });

    // Return a response that clears cookies
    const response = NextResponse.json({ success: true });

    // Clear all auth cookies
    response.cookies.delete("better-auth.session-token");
    response.cookies.delete("better-auth.csrf-token");
    response.cookies.delete("better-auth.callback-url");

    return response;
  } catch (error) {
    console.error("Server logout error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
