"use server";

import * as z from "zod";
import { CreateProjectSchema } from "@/schemas";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createProject(
  values: z.infer<typeof CreateProjectSchema>,
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
    const newProject = await prisma.project.create({
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
        // "teamMembers" is the relation name in your Project table
        teamMembers: {
          create: teamMembers.map((member) => ({
            userId: member.userId,
            role: member.role || "Member",
            // You do NOT need to provide projectId here;
            // Prisma injects it automatically.
          })),
        },
      },
      // This tells Prisma to fetch the records from the
      // DIFFERENT table (ProjectMember) and include them in the result.
      include: {
        teamMembers: true,
      },
    });

    revalidatePath("/projects");
    return {
      success: "Project created successfully!",
      data: newProject,
    };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create project." };
  }
}
