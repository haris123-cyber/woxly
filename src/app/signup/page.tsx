"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserPlus, User, Mail, Key } from "lucide-react";

// Schema for signup validation
const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    // Simulate sign up registration
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/account");
  };

  return (
    <div className="max-w-md mx-auto py-12 text-left text-xs font-semibold">
      <div className="bg-card text-card-foreground border border-border p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-black uppercase tracking-wider text-foreground">Create Account</h1>
          <p className="text-[11px] text-muted-foreground">Join Woxly to track orders and save wishlists</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-muted-foreground mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="e.g. John Doe"
                {...register("fullName")}
                className={`w-full bg-muted text-foreground pl-10 pr-3 py-3 rounded-lg border focus:outline-none focus:border-accent ${
                  errors.fullName ? "border-red-500" : "border-border"
                }`}
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.fullName.message}</p>}
          </div>

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
            <label className="block text-muted-foreground mb-1.5">Password</label>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
              <input
                type="password"
                placeholder="Minimum 6 characters"
                {...register("password")}
                className={`w-full bg-muted text-foreground pl-10 pr-3 py-3 rounded-lg border focus:outline-none focus:border-accent ${
                  errors.password ? "border-red-500" : "border-border"
                }`}
              />
            </div>
            {errors.password && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-muted-foreground mb-1.5">Confirm Password</label>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
              <input
                type="password"
                placeholder="Repeat password"
                {...register("confirmPassword")}
                className={`w-full bg-muted text-foreground pl-10 pr-3 py-3 rounded-lg border focus:outline-none focus:border-accent ${
                  errors.confirmPassword ? "border-red-500" : "border-border"
                }`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.confirmPassword.message}</p>
            )}
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
                <UserPlus className="h-4 w-4" /> Sign Up
              </>
            )}
          </button>
        </form>

        <p className="text-[11px] text-muted-foreground text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-accent hover:underline font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
