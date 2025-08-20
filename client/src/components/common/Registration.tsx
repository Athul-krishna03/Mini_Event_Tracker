"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Calendar } from "lucide-react";

// ✅ Validation schema with Yup
const schema = yup.object({
  name: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

interface RegistrationFormProps {
  role: "user" | "organizer";
  onSubmit?: (data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
  }) => void;
}

export default function RegistrationForm({
  role,
  onSubmit,
}: RegistrationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const isOrganizer = role === "organizer";
  const Icon = isOrganizer ? Calendar : Users;
  const roleLabel = isOrganizer ? "Organizer" : "User";
  const buttonClass = isOrganizer
    ? "w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
    : "w-full bg-accent hover:bg-accent/90 text-accent-foreground";

  const submitHandler = (data: any) => {
    const registrationData = { ...data, role };
    console.log("Registration attempt:", registrationData);
    onSubmit?.(registrationData);
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left side - Images */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20" />
        <img
          src="/Event2.jpg"
          alt="Event registration and networking"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Join Our Community</h2>
          <p className="text-lg opacity-90">
            Start creating and attending amazing events
          </p>
        </div>
      </div>

      {/* Right side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">
              Create Account
            </h1>
            <p className="text-muted-foreground mt-2">
              Sign up as a {roleLabel.toLowerCase()}
            </p>
          </div>

          <Card className="border-border shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <Icon className="w-6 h-6" />
                {roleLabel} Registration
              </CardTitle>
              <CardDescription className="text-center">
                Fill in your details to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(submitHandler)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    {...register("name")}
                    className="bg-input border-border"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={`Enter your ${
                      isOrganizer ? "business " : ""
                    }email`}
                    {...register("email")}
                    className="bg-input border-border"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    {...register("phone")}
                    className="bg-input border-border"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    {...register("password")}
                    className="bg-input border-border"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    {...register("confirmPassword")}
                    className="bg-input border-border"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className={buttonClass}>
                  Create {roleLabel} Account
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  By creating an account, you agree to our{" "}
                  <a
                    href="#"
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <a
                    href="/"
                    className="text-black hover:text-gray-700 font-medium transition-colors"
                  >
                    Sign in here
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
