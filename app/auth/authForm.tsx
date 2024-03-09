"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authLogin, getAuthOtp } from "@/server/actions/auth";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { OTPInput, SlotProps } from "input-otp";
import { cn } from "@/lib/utils";

const AuthForm = () => {
  const getOtp = useMutation({
    mutationFn: (variables: any) =>
      getAuthOtp(variables.phone, variables.refId),
  });
  const login = useMutation({
    mutationFn: (variables: { phone: string; code: string }) =>
      authLogin(variables.phone, variables.code),
  });
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      phone: "",
      code: undefined,
      ref: localStorage.getItem("ref"),
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <div className="flex w-full flex-col">
              <FormItem className="flex flex-col">
                <FormLabel>شماره موبایل</FormLabel>
                <FormControl>
                  <div className="relative">
                    <input
                      readOnly={getOtp.data?.status}
                      className="h-12 w-full rounded-md border px-5 read-only:opacity-50 disabled:opacity-50"
                      placeholder="شماره موبایل شما"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  لطفا شماره تلفن خود را با 0 وارد کنید.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        {getOtp.data?.status && (
          <FormField
            control={form.control}
            name="code"
            render={({ field: { value, ...filed } }) => (
              <div className="flex w-full flex-col">
                <FormItem className="flex flex-col">
                  <FormLabel>کد تایید</FormLabel>
                  <FormControl>
                    <OTPInput
                      {...filed}
                      maxLength={6}
                      render={({ slots }) => (
                        <div className="flex flex-row-reverse justify-between">
                          {slots.map((slot, idx) => (
                            <Slot key={idx} {...slot} />
                          ))}
                        </div>
                      )}
                    />
                  </FormControl>
                  <FormDescription>
                    لطفا کد 5 رقمی ارسال شده را وارد کنید
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
        )}
        <button
          type="submit"
          className="flex h-10 items-center gap-2 rounded-md bg-blue-600 px-5 text-sm text-gray-50 disabled:opacity-50"
          disabled={
            getOtp.isPending || login.isPending || !form.formState.isValid
          }
        >
          {(getOtp.isPending || login.isPending) && (
            <Loader2 className="animate-spin" size={16} />
          )}
          {getOtp.data?.status ? "ورود" : "دریافت کد تایید"}
        </button>
      </form>
    </Form>
  );

  function onSubmit(values: z.infer<typeof authSchema>) {
    if (!getOtp.data?.status)
      getOtp.mutate(
        { phone: values.phone, refId: values.ref },
        {
          onError(error) {
            toast.error("خطایی رخ داده است! لطفا مجددا تلاش کنید.");
          },
          onSuccess(data) {
            if (data.status) {
              toast.success(data.message);
              form.setValue("code", "");
            } else toast.error(data.message);
          },
        },
      );
    else if (getOtp.data.status)
      login.mutate(
        { ...values, code: values.code! },
        {
          onError(error) {
            toast.error(
              "خطای غیر منتظره ای رخ داده است! لطفا مجدداً تلاش کنید.",
            );
          },
          onSuccess(data) {
            if (!data.status) {
              toast.error(data.message);
              return;
            }
            toast.success(data.message);
          },
        },
      );
  }
};

export default AuthForm;

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative h-12 w-12 rounded-md text-[2rem]",
        "flex items-center justify-center",
        "border",
        "group-focus-within:border-accent-foreground/20 group-hover:border-accent-foreground/20",
        "outline outline-0 outline-accent-foreground/20",
        { "outline-2 outline-accent-foreground": props.isActive },
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
