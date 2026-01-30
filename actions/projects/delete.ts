"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { success } from "zod";

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: {
        id,
      },
    });

    revalidatePath("/projects");

    return { success: "Project deleted successfully!" };
  } catch (error) {
    return { error: "Something went wrong. Could not delete project!" };
  }
}
