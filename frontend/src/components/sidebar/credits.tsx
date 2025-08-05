"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";

export async function Credits() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  const user = await db.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: { credits: true },
  });

  return (
    <div className="flex flex-col">
      <span className="font-display text-foreground text-lg font-semibold">
        {user.credits}
      </span>
      <span className="font-caption text-muted-foreground text-sm">
        Credits
      </span>
    </div>
  );
}
