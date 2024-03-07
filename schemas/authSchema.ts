import { z } from "zod";

export const authSchema = z.object({
  phone: z.string().length(11).startsWith("09"),
  code: z.string().length(5).or(z.undefined()).or(z.null()),
});
