"use client";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { setFirstTimeName } from "@/server/actions/auth";
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
import { nameSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const NameForm = () => {
  const setName = useMutation({
    mutationFn: (variables: string) => setFirstTimeName(variables),
  });
  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <div className="flex w-full flex-col">
              <FormItem className="flex flex-col">
                <FormLabel>نام و نام خانوادگی</FormLabel>
                <FormControl>
                  <div className="relative">
                    <input
                      className="h-12 w-full rounded-md border px-5 read-only:opacity-50 disabled:opacity-50"
                      placeholder="نام و نام خانوادگی شما"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  نام و نام خانوادگی قابل تغیر نیست, لطفا آن را به درستی وارد
                  کنید.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <button
          type="submit"
          className="flex h-10 items-center gap-2 rounded-md bg-blue-600 px-5 text-sm text-gray-50 disabled:opacity-50"
          disabled={setName.isPending}
        >
          {setName.isPending && <Loader2 className="animate-spin" size={16} />}
          ادامه
        </button>
      </form>
    </Form>
  );

  function onSubmit(values: z.infer<typeof nameSchema>) {
    console.log(values);
    setName.mutate(values.name, {
      onError(e) {
        toast.error("خطایی رخ داده است! لطفا مجددا تلاش کنید.");
      },
      onSuccess(data) {
        toast[data?.status ? "success" : "error"](data?.message);
      },
    });
  }
};

export default NameForm;
