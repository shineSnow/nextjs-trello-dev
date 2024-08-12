"use server";

import { db } from "@/lib/db";

export async function create(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  console.log("create");
  console.log(title);

  await db.board.create({
    data: {
      title,
    },
  });
}
