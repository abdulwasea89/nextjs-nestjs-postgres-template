import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  projectType: z.enum(["saas", "marketplace", "internal_tool", "mvp", "ecommerce", "ai_app", "other"]),
  users: z.number().min(1),
  timelineMonths: z.number().min(1),
  budget: z.number().min(0),
  teamSize: z.number().min(1),
  teamSkills: z.string(),
  features: z.object({
    realtime: z.boolean(),
    auth: z.boolean(),
    payments: z.boolean(),
    media: z.boolean(),
    ai: z.boolean(),
    analytics: z.boolean(),
    mobile: z.boolean(),
    offline: z.boolean(),
    collaboration: z.boolean(),
  }),
  integrations: z.string(),
});

export type ProjectInput = z.infer<typeof projectSchema>;