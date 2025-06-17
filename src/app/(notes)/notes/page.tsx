"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase-client"
import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react"
import Image from "next/image"

type notesResponse = {
    id: number;
    created_at: string;
    image: string;
    name: string;
    price: string;
}

export default function Notes() {
    const [pop, setPop] = useState(false)
    const [notes, setNotes] = useState<notesResponse[]>([])

    // const [image, setImage] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [price, setprice] = useState<string>("")
    const [id, setId] = useState<number | null>(null)

    const fetchNotes = async () => {
        const { error, data } = await supabase.from("notes").select("*")
        console.log(data)
        if (data) {
            setNotes(data as notesResponse[])
        }
        if (error) {
            console.error("Error fetching notes:", error)
        }
    }

    const deleteNotes = async (id: number, imageUrl: string) => {
        const filePath = imageUrl.split("/").pop();
        console.log(filePath, id)
        // console.log(filePath)
        if (filePath) {
            const { error: storageError } = await supabase.storage.from("notes-images").remove([filePath])
            if (storageError) {
                console.error("Failed to delete image from storage:", storageError.message);
            } else {
                console.log("Image deleted from storage");
            }
        }
        const { error, data } = await supabase.from("notes").delete().eq("id", Number(id))
        if (error) {
            console.error("Error delete notes:", error)
        } else {
            console.log("Deleted:", data)
            await fetchNotes()
        }
    }

    const updateNotes = async (id: number) => {
        setPop(true)
        const { data, error } = await supabase.from("notes").select("*").eq("id", id)
        if (error) {
            console.error("Error in get nots for update notes:", error)
        }
        const { name, price } = data?.[0]
        setName(name)
        setprice(price)
        setId(id)
    }

    const clickUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setPop(false)
        const { error, data } = await supabase.from("notes").update([{ name, price }]).eq("id", Number(id))
        if (error) {
            console.error("Error in update notes:", error)
        }
        if (data) {
            fetchNotes()
        }
    }


    useEffect(() => {
        fetchNotes()
        const channel = supabase
            .channel('public:notes') // table name
            .on('postgres_changes', {
                event: '*', // 'INSERT' | 'UPDATE' | 'DELETE' | '*'
                schema: 'public',
                table: 'notes',
            }, (payload) => {
                console.log('Change received!', payload);
                fetchNotes(); // or directly update UI state
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div>
            {pop ? (
                <div className="h-[80vh] items-center py-[100px]">
                    <form className="flex justify-center" onSubmit={clickUpdate}>
                        <Card className="w-full max-w-sm">
                            <CardHeader className="w-[100%] items-center flex justify-between">
                                <div>
                                    <CardTitle>Update Model</CardTitle>
                                </div>
                                <div className="hover:cursor-pointer" onClick={() => setPop(false)}>❌</div>
                            </CardHeader>

                            <CardContent>

                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">name</Label>
                                        <Input
                                            suppressHydrationWarning
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="price">price</Label>
                                        <Input
                                            suppressHydrationWarning
                                            id="price"
                                            type="text"
                                            value={price}
                                            onChange={(e) => setprice(e.target.value)}
                                        />
                                    </div>
                                </div>

                            </CardContent>
                            <CardFooter className="flex-col gap-2">
                                <Button suppressHydrationWarning className="w-full hover:cursor-pointer" type="submit">
                                    update
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            ) : (
                <div>
                    <h1 className="font-bold text-3xl text-center my-[10px]">All Notes</h1>
                    <div className="grid grid-cols-4 gap-3 mx-[20px]">
                        {notes.map((note, idx) => (
                            <div key={idx}>
                                <Image
                                    src={note?.image}
                                    alt={note?.name}
                                    width={200}
                                    height={200}
                                // style={{ objectFit: "cover" }}
                                />

                                <p>Name: {note.name}</p>
                                <p>Price: {note.price}</p>
                                <div className="flex justify-between w-[50%] m-auto">
                                    <Button onClick={() => deleteNotes(note.id, note.image)} className="hover:cursor-pointer">Delete</Button>
                                    <Button onClick={() => updateNotes(note.id)} className="hover:cursor-pointer">Update</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
            }
        </div >
    )
}
