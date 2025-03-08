"use client";

import { useForm, FormProvider } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";
import { LoginSchema } from "../validators/auth";
import { LoginForm } from "../types/auth";






export default function LoginCard() {
 
  const methods = useForm<LoginForm>({
    resolver: joiResolver(LoginSchema),
  });

  const { loginUser, message, isError, resetState, isLoading } = useAuthStore(); 
  useEffect(() => {
    resetState(); 
  }, []);

  const router = useRouter();
  const onSubmit = async (data: LoginForm) => {
    await loginUser(data.email, data.password);
};

useEffect(() => {
  if (message === "Login successful!") {
      router.push("/dashboard");
      toast.success(message);
  } else if (message === "Logout successful!") {
      
      toast.success(message);
      
  }
}, [message, isError]);





  return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput name="email" label="Email" type="email" placeholder="m@example.com" autocomplete="current-email" />
            <FormInput name="password" label="Password" type="password" placeholder="******" autocomplete="current-password" />
            <div className="flex justify-center items-center text-center">
            Belum mempunyai akun? <a href="/register" className="text-blue-500 ml-2">Register</a>
          </div>
            <Button type="submit" className="w-full justify-center"  disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
      
            </Button>
            {isError && <p style={{ color: "red" }}>{message}</p>}
          </form>
        </FormProvider>
  );
}
