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
  console.log(validatedFields);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized!" };
  }

  const userId = session.user.id;

  const {
    title,
    description,
    status,
    priority,
    department,
    startDate,
    endDate,
    budget,
    teamMembers,
  } = validatedFields.data;

  try {
    const newProject = await prisma.$transaction(async (tx) => {
      // Create the project first
      const project = await tx.project.create({
        data: {
          title,
          description,
          status,
          priority,
          department,
          startDate,
          endDate,
          budget,
          authorId: userId,
        },
      });

      // 3. Create explicit join table records
      if (teamMembers && teamMembers.length > 0) {
        await tx.projectMember.createMany({
          data: teamMembers.map((member) => ({
            projectId: project.id,
            userId: member.userId,
            role: member.role || "Member",
          })),
        });
      }

      return project;
    });

    revalidatePath("/projects");
    return { success: "Project created successfully!" };
  } catch (error) {
    return { error: "Failed to create project." };
  }

  // await prisma.project.create({
  //   data: {
  //     title,
  //     description,
  //     status,
  //     priority,
  //     department,
  //     startDate,
  //     endDate,
  //     budget,
  //     authorId: session.user.id,
  //   },
  // });

  // revalidatePath("/projects");

  // return { success: "Project created successfully!" };
}
