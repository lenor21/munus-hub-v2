"use server";

import { UpdateProjectSchema } from "@/schemas";
import * as z from "zod";

export async function updateProject(
  values: z.infer<typeof UpdateProjectSchema>
) {
  const validatedFields = UpdateProjectSchema.safeParse(values);

  console.log(validatedFields);

  return { success: "Project updated successfully!" };
}
