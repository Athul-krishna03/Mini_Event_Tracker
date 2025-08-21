import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar } from "lucide-react"

interface LoginFormProps {
    role: "user" | "organizer"
    onSubmit?: (data: { email: string; password: string; role: string }) => void
}

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

export default function LoginForm({ role, onSubmit }: LoginFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    })

    const isOrganizer = role === "organizer"
    const Icon = isOrganizer ? Calendar : Users
    const roleLabel = isOrganizer ? "Organizer" : "User"
    const buttonClass = isOrganizer
        ? "w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
        : "w-full bg-accent hover:bg-accent/90 text-accent-foreground"

    const onFormSubmit = (data: any) => {
        const loginData = { ...data, role }
        console.log("Login attempt:", loginData)
        onSubmit?.(loginData)
    }

    return (
        <div className="min-h-screen flex">
        {/* Left side - Images */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20" />
            <img
            src="/Events.jpg"
            alt="Event management professionals"
            className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Manage Events Seamlessly</h2>
            <p className="text-lg opacity-90">Connect organizers and attendees in one platform</p>
            </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
            <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
                <p className="text-muted-foreground mt-2">
                Sign in to your {roleLabel.toLowerCase()} account
                </p>
            </div>

            <Card className="border-border shadow-lg">
                <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                    <Icon className="w-6 h-6" />
                    {roleLabel} Login
                </CardTitle>
                <CardDescription className="text-center">
                    Enter your credentials to continue
                </CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                    {/* Email */}
                    <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder={`Enter your ${isOrganizer ? "organizer " : ""}email`}
                        {...register("email")}
                        className="bg-input border-border"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message?.toString()}</p>
                    )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password")}
                        className="bg-input border-border"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message?.toString()}</p>
                    )}
                    </div>

                    {/* Submit */}
                    <Button type="submit" className={`${buttonClass} transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg`}>
                    Sign In as {roleLabel}
                    </Button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="font-medium transition-colors text-black hover:text-black"
                    >
                        Sign up here
                    </a>
                    </p>
                </div>
                </CardContent>
            </Card>
            </div>
        </div>
        </div>
    )
}
