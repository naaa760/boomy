import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  // Redirect authenticated users to the dashboard
  redirect("/dashboard");
}
