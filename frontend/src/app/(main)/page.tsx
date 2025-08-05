import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";

export default async function Page() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      redirect("/");
    }

    // Redirect authenticated users to the dashboard
    redirect("/dashboard");
  } catch (error) {
    console.error("Error in main page:", error);
    // If there's any error, redirect to home
    redirect("/");
  }
}

// Add a dynamic export to help with build
export const dynamic = "force-dynamic";
