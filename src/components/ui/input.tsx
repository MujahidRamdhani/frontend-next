import * as React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & { name: string; className?: string }>(
  ({ className = "", type, name, ...props }, ref) => {
    const {
      formState: { errors },
      register,
    } = useFormContext();
    const error = errors[name];
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    return (
      <div className="relative w-full">
        <input
          {...register(name)}
          type={isPassword && showPassword ? "text" : type}
          name={name}
          className={cn(
            "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            error ? "border-red-500 focus-visible:ring-red-500 pr-10" : "border-input",
            isPassword ? "pr-10" : "",
            className
          )}
          ref={ref}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}

        {error && (
          <div className={`absolute inset-y-0 ${type === "password" ? "right-10" : "right-2"} flex items-center`}>
            <AlertTriangle className="text-red-500 h-5 w-5" />
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
