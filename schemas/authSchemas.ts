import { z } from "zod";

export const phoneSchema = z
  .string({
    invalid_type_error: "لطفا شماره تلفن خود را به درستی وارد کنید!",
    required_error: "لطفا شماره تلفن خود را وارد کنید!",
  })
  .length(11, { message: "شماره تلفن باید 11 رقم باشد!" })
  .regex(/^[0-9]*$/, { message: "لطفاً یک شماره تلفن معتبر وارد کنید!" })
  .startsWith("09", { message: "شماره تلفن باید با 09 شروع شود!" });

export const authSchema = z.object({
  phone: phoneSchema,
  code: z
    .string({
      invalid_type_error: "لطفا کد تایید را به درستی وارد کنید",
      required_error: "طفا کد تایید را به درستی وارد کنید",
    })
    .length(6, "کد تایید باید 6 رقم باشد!")
    .or(z.null())
    .or(z.undefined()),
  ref: z.string().or(z.null()).or(z.undefined()),
});

export const nameSchema = z.object({
  name: z.string().min(4).max(64),
});
