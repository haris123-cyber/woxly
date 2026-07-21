"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LogIn, Key, Mail } from "lucide-react";

// Schema for login validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/account");
  };

  return (
    <div className="max-w-md mx-auto py-12 text-left text-xs font-semibold">
      <div className="bg-card text-card-foreground border border-border p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-black uppercase tracking-wider text-foreground">Welcome Back</h1>
          <p className="text-[11px] text-muted-foreground">Sign in to your customer account portal</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-muted-foreground mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
              <input
                type="email"
                placeholder="e.g. customer@example.com"
                {...register("email")}
                className={`w-full bg-muted text-foreground pl-10 pr-3 py-3 rounded-lg border focus:outline-none focus:border-accent ${
                  errors.email ? "border-red-500" : "border-border"
                }`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.email.message}</p>}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-muted-foreground">Password</label>
              <a href="#" className="text-[10px] text-accent hover:underline font-bold">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={`w-full bg-muted text-foreground pl-10 pr-3 py-3 rounded-lg border focus:outline-none focus:border-accent ${
                  errors.password ? "border-red-500" : "border-border"
                }`}
              />
            </div>
            {errors.password && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider cursor-pointer disabled:bg-zinc-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="h-4 w-4" /> Sign In
              </>
            )}
          </button>
        </form>

        <p className="text-[11px] text-muted-foreground text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-accent hover:underline font-bold">
            Sign Up Now
          </Link>
        </p>
      </div>
    </div>
  );
}
