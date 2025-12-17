"use server";

import * as z from "zod";
import { CreateProjectSchema } from "@/schemas";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createProject(
  values: z.infer<typeof CreateProjectSchema>
) {
  const validatedFields = CreateProjectSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized!" };
  }

  const {
    title,
    description,
    status,
    priority,
    department,
    startDate,
    endDate,
    budget,
  } = validatedFields.data;

  await prisma.project.create({
    data: {
      title,
      description,
      status,
      priority,
      department,
      startDate,
      endDate,
      budget,
      authorId: session.user.id,
    },
  });

  revalidatePath("/projects");

  return { success: "Project created successfully!" };
}
