"use server";

import * as z from "zod";
import { CreateProjectSchema } from "@/schemas";

export async function createProject(
  values: z.infer<typeof CreateProjectSchema>
) {
  const validatedFields = CreateProjectSchema.safeParse(values);

  // if (!validatedFields.success) {
  //   return { error: "Invalid fields!" };
  // }

  console.log(validatedFields);

  return { success: "Project created successfully!" };
}
