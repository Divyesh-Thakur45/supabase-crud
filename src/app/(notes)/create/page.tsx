"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase-client";
import React, { useState } from "react";

export default function Create() {
    // const [isClient, setIsClient] = useState(false);
    // const [image, setImage] = useState<File | null>(null)
    const [name, setName] = useState<string>("")
    const [price, setprice] = useState<string>("")
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        const supabase_data = await supabase.from("notes").insert([{ name, price }]).single()
        console.log(supabase_data)
    }


    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <form suppressHydrationWarning onSubmit={handleCreate}>
                <Card className="w-[120%] max-w-sm p-5">
                    <div className="flex flex-col gap-6">

                        {/* <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label suppressHydrationWarning htmlFor="image">image</Label>
                            </div>
                            <Input onChange={(e) => setImage(e.target.files?.[0] || null)} id="image" type="file" />
                        </div> */}

                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="name">name</Label>
                            </div>
                            <Input suppressHydrationWarning onChange={(e) => setName(e.target.value)} id="name" type="text" />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="price">price</Label>
                            </div>
                            <Input suppressHydrationWarning onChange={(e) => setprice(e.target.value)} id="price" type="text" />
                        </div>

                    </div>
                    <Button suppressHydrationWarning>Create</Button>
                </Card>
            </form>
        </div>
    )
}