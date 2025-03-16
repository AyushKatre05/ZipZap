"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { protectSignUpAction } from "@/actions/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { toast, Toaster } from "sonner";

function Registerpage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { register, isLoading } = useAuthStore();
  const router = useRouter();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const checkFirstLevelOfValidation = await protectSignUpAction(
      formData.email
    );
    if (!checkFirstLevelOfValidation.success) {
      toast.error(checkFirstLevelOfValidation.error);
      return;
    }

    const userId = await register(
      formData.name,
      formData.email,
      formData.password
    );
    if (userId) {
      toast.success("Registration Successful!");
      router.push("/auth/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-6">
      <Toaster />
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-lg w-full text-center">
        <h2 className="text-3xl font-extrabold text-gray-800">Create an Account</h2>
        <p className="text-gray-600 mt-2">Join us and start your journey today!</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="text-left">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
              className="bg-gray-100 border-2 border-gray-300 rounded-lg p-2 w-full"
              value={formData.name}
              onChange={handleOnChange}
            />
          </div>
          <div className="text-left">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              className="bg-gray-100 border-2 border-gray-300 rounded-lg p-2 w-full"
              value={formData.email}
              onChange={handleOnChange}
            />
          </div>
          <div className="text-left">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              className="bg-gray-100 border-2 border-gray-300 rounded-lg p-2 w-full"
              value={formData.password}
              onChange={handleOnChange}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-500 text-white font-bold py-3 rounded-lg hover:bg-indigo-600 transition"
          >
            {isLoading ? "Creating Account..." : "CREATE ACCOUNT"}
          </Button>
          <p className="text-gray-600 text-sm">
            Already have an account? 
            <Link href="/auth/login" className="text-indigo-600 hover:underline font-semibold"> Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registerpage;