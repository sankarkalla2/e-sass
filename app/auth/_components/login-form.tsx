"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Wrapper from "./wrappter";
import { loginSchema } from "@/app/schemas/login-schema";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { useState, useTransition } from "react";
import { login } from "@/actions/login";
import Success from "./success";
import Error from "./error";

const LoginForm = () => {
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data.error!);
        setSuccess(data.success!);
      });
    });
    form.reset();
  }
  return (
    <Wrapper
      backButtonHref="/auth/register"
      backButtonLabel="Don't you have account"
      authDescription="Welcome back"
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passoword</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {success && <Success message={success} />}
            {error && <Error message={error} />}
            <Button className="w-full" type="submit" disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </Wrapper>
  );
};

export default LoginForm;
