"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

export async function deleteOverview(id: string) {
  try {
    await prisma.projectOverview.delete({
      where: {
        id,
      },
    });

    revalidatePath("/projects");

    return { success: "Overview deleted successfully!" };
  } catch (error) {
    return { error: "Something went wrong. Could not delete overview!" };
  }
}

export async function deleteMember(id: string) {
  try {
    await prisma.projectMember.delete({
      where: {
        id,
      },
    });

    revalidatePath("/projects");

    return { success: "Member deleted successfully!" };
  } catch (error) {
    return { error: "Something went wrong. Could not delete member!" };
  }
}
