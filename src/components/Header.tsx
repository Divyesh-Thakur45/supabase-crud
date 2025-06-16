import Link from "next/link";

export default function Header() {
    return (
        <div>
            <nav className="flex bg-white shadow-2xl p-5 justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link href={"/"}>Coders</Link>
                </div>
                <div>
                    <ul className="flex">
                        <li className="mx-3 text-[16px] font-medium"><Link href={"/notes"}>Notes</Link></li>
                        <li className="mx-3 text-[16px] font-medium"><Link href={"/create"}>Create</Link></li>
                        <li className="mx-3 text-[16px] font-medium"><Link href={"/login"}>Login</Link></li>
                        <li className="mx-3 text-[16px] font-medium"><Link href={"/signup"}>Signup</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}