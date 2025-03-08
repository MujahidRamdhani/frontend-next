"use client";

import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import { toast } from "sonner";
import { RegisterForm } from "../types/auth";
import { registerSchema } from "../validators/auth";



export default function FormRegister() {
  const methods = useForm<RegisterForm>({
    resolver: joiResolver(registerSchema),
  });
  const { registerUser, message, isError, resetState, isLoading } = useAuthStore();

  useEffect(() => {
    resetState();
  }, []);

  const router = useRouter();

  const onSubmit = async (data: RegisterForm) => {
    await registerUser(data.fullName, data.email, data.password);
  };

  useEffect(() => {
    if (message) {
      if (!isError) {
        router.push("/dashboard");
        toast.success(message);
      }
    }
  }, [message, isError]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput name="fullName" label="Full Name" type="text" placeholder="John Doe"  autocomplete="current-fullname" />
        <FormInput name="email" label="Email" type="email" placeholder="m@example.com"  autocomplete="current-email" />
        <FormInput name="password" label="Password" type="password" placeholder="******"  autocomplete="current-password" />
        <FormInput name="confirmPassword" label="Confirm Password" type="password" placeholder="******" autocomplete="current-confirmPassword"  />
        

        {isError && <p style={{ color: "red" }}>{message}</p>}
        
        <Button type="submit" className="w-full justify-center" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Register"}
        </Button>
        <div className="flex justify-center items-center text-center">
        Already have an account ?{" "}
          <a href="/" className="text-blue-500 ml-2">
            Login
          </a>
        </div>
      </form>
    </FormProvider>
  );
}
