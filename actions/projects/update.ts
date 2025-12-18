"use server";

import prisma from "@/lib/prisma";
import { UpdateProjectSchema } from "@/schemas";
import * as z from "zod";
import { revalidatePath } from "next/cache";

export async function updateProject(
  values: z.infer<typeof UpdateProjectSchema>,
  id: string
) {
  const validatedFields = UpdateProjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
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
    progress,
  } = validatedFields.data;

  await prisma.project.update({
    where: { id },
    data: {
      title,
      description,
      status,
      priority,
      department,
      startDate,
      endDate,
      budget,
      progress,
    },
  });

  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);

  return { success: "Project updated successfully!" };
}
