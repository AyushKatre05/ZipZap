"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { protectSignInAction } from "@/actions/auth";
import { toast, Toaster } from "sonner";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const checkFirstLevelOfValidation = await protectSignInAction(
      formData.email
    );

    if (!checkFirstLevelOfValidation.success) {
      toast.error(checkFirstLevelOfValidation.error);
      return;
    }

    const success = await login(formData.email, formData.password);
    if (success) {
      toast.success("Login Successful!");
      const user = useAuthStore.getState().user;
      if (user?.role === "SUPER_ADMIN") router.push("/super-admin");
      else router.push("/home");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#ffede1] to-[#fff6f4] flex items-center justify-center p-6">
      <Toaster />
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="bg-gray-100 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleOnChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              className="bg-gray-100 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleOnChange}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white hover:bg-gray-900 transition-colors rounded-lg py-2"
          >
            {isLoading ? "Logging in..." : "LOGIN"}
          </Button>
          <p className="text-center text-gray-600 text-sm">
            New here? {" "}
            <Link
              href={"/auth/register"}
              className="text-black hover:underline font-bold"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;