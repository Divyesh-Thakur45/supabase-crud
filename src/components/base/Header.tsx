"use client";
import { supabase } from "@/lib/supabase-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

const Header = () => {
    const [session, setSession] = useState<Session | null>(null)
    const fetchSession = async () => {
        const { data, error } = await supabase.auth.getSession()
        setSession(data.session)
        if (error) {
            console.log("session error : ", error.message)
        }
    }
    const handleLogout = async () => {
        await supabase.auth.signOut()
        setSession(null);
    }
    useEffect(() => {
        fetchSession()
    }, [])
    return (
        <div>
            <nav className="flex bg-white shadow-2xl p-5 justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link href={"/"}>Coders</Link>
                </div>
                <div>
                    <ul className="flex">
                        {session ? (
                            <>
                                <li className="mx-3 text-[16px] font-medium"><Link href={"/notes"}>Notes</Link></li>
                                <li className="mx-3 text-[16px] font-medium"><Link href={"/create"}>Create</Link></li>
                                <li className="mx-3 text-[16px] font-medium hover:cursor-pointer" onClick={handleLogout}>Logout</li>
                            </>
                        ) : (
                            <>
                                <li className="mx-3 text-[16px] font-medium"><Link href={"/login"}>Login</Link></li>
                                <li className="mx-3 text-[16px] font-medium"><Link href={"/signup"}>Signup</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header;