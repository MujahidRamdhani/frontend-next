"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autocomplete?: string; // Tambahkan properti ini
}


export function FormInput({ name, label, type = "text", placeholder, autocomplete }: FormInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} type={type} placeholder={placeholder} autoComplete={autocomplete} {...register(name)} />
      {errors[name] && <FormMessage>{errors[name]?.message as string}</FormMessage>}
    </div>
  );
}
