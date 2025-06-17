"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase-client"
import { useEffect, useState } from "react"

type notesResponse = {
    id: number;
    created_at: string;
    name: string;
    price: string;
}

export default function Notes() {
    const [notes, setNotes] = useState<notesResponse[]>([])

    const fetchNotes = async () => {
        const { error, data } = await supabase.from("notes").select("*")
        if (data) {
            setNotes(data as notesResponse[])
        }
        if (error) {
            console.error("Error fetching notes:", error)
        }
    }

    const deleteNotes = async (id: number) => {
        console.log("Trying to delete id:", typeof id)
        const { error, data } = await supabase.from("notes").delete().eq("id", Number(id))
        if (error) {
            console.error("Error delete notes:", error)
        } else {
            console.log("Deleted:", data)
            await fetchNotes()
        }
    }


    useEffect(() => {
        fetchNotes()
    }, [])

    return (
        <div>
            <h1 className="font-bold text-3xl text-center my-[10px]">All Notes</h1>
            <div className="grid grid-cols-4 gap-3">
                {notes.map((note) => (
                    <div key={note.id} className="bg-white text-center h-[15vh] flex flex-col items-center rounded-2xl">
                        <p>Name: {note.name}</p>
                        <p>Price: {note.price}</p>
                        <div className="flex justify-between w-[50%] m-auto">
                            <Button onClick={() => deleteNotes(note.id)}>Delete</Button>
                            <Button>Update</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
