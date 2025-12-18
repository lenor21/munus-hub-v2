import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z
  .object({
    fullname: z.string().min(1, {
      message: "Fullname is required",
    }),
    email: z.string().email().min(1, { message: "Email is required" }),
    password: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    confirmPassword: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const CreateProjectSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Project name must be at least 2 characters.",
    })
    .max(100, {
      message: "Project name cannot exceed 100 characters.",
    }),

  description: z
    .string()
    .max(500, {
      message: "Description cannot exceed 500 characters.",
    })
    .or(z.literal("")),

  status: z.string().or(z.literal("")),
  priority: z.string().or(z.literal("")),
  department: z.string().or(z.literal("")),

  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),

  budget: z.number().int().min(0, {
    message: "Budget cannot be negative.",
  }),
  teamMembers: z
    .array(
      z.object({
        userId: z.string(),
        role: z.string(),
      })
    )
    .default([]),
});

export const UpdateProjectSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Project name must be at least 2 characters.",
    })
    .max(100, {
      message: "Project name cannot exceed 100 characters.",
    }),

  description: z
    .string()
    .max(500, {
      message: "Description cannot exceed 500 characters.",
    })
    .or(z.literal("")),

  status: z.string().or(z.literal("")),
  priority: z.string().or(z.literal("")),
  department: z.string().or(z.literal("")),

  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),

  budget: z.number().int().min(0, {
    message: "Budget cannot be negative.",
  }),
  progress: z
    .number()
    .int()
    .min(0, { message: "Progress cannot be less than 0%." })
    .max(100, { message: "Progress cannot exceed 100%." }),
});
