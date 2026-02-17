"use server";

import prisma from "@/lib/prisma";
import { UpdateProjectSchema } from "@/schemas";
import * as z from "zod";
import { revalidatePath } from "next/cache";

export async function updateProject(
  values: z.infer<typeof UpdateProjectSchema>,
  id: string,
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
    teamMembers,
  } = validatedFields.data;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.project.update({
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

      if (teamMembers) {
        // Delete old members for this project
        await tx.projectMember.deleteMany({
          where: { projectId: id },
        });

        // Create the new list of members
        if (teamMembers.length > 0) {
          await tx.projectMember.createMany({
            data: teamMembers.map((member) => ({
              projectId: id,
              userId: member.userId,
              role: member.role || "Member",
            })),
          });
        }
      }
    });

    revalidatePath("/projects");
    revalidatePath(`/projects/${id}`);

    return { success: "Project and team updated successfully!" };
  } catch (error) {
    console.error("Update error:", error);
    return { error: "Something went wrong during the update." };
  }
}

export async function updateOverview(id: string, feature: string) {
  try {
    await prisma.projectOverview.update({
      where: { id },
      data: { feature },
    });

    revalidatePath(`/projects`);

    return { success: "Feature updated successfully!" };
  } catch (error) {
    return { error: "Failed to update feature." };
  }
}
