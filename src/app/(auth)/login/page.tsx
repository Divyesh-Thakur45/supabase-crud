"use client";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase-client";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const supabase_data = await supabase.auth.signInWithPassword({ email, password })
        console.log(supabase_data)
    }
    const handleGoogleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const { error, data } = await supabase.auth.signInWithOAuth({
            provider: "google"
        })
        if (error) {
            alert("error")
        }
        console.log(data)
    }
    return (
        <div className="">
            <p className="text-2xl font-medium flex justify-center my-[50px]">Login page</p>
            <form onSubmit={handleLogin} className="flex justify-center">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                        <CardAction>
                            <Link href={"/signup"}>Sign Up</Link>
                        </CardAction>
                    </CardHeader>
                    <CardContent>

                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="xyz@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
                            Login with Google
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div >
    )
}