"use server";

import prisma from "@/lib/prisma";

export async function getProjects(
  filters: { search?: string; status?: string; memberId?: string } = {},
) {
  const { search, status, memberId } = filters;

  return await prisma.project.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        status ? { status } : {},
        memberId
          ? {
              teamMembers: {
                some: { userId: memberId },
              },
            }
          : {},
      ],
    },
    include: {
      teamMembers: { include: { user: true } },
    },
  });
}
