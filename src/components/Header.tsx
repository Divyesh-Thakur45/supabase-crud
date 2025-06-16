export default function Header() {
    return (
        <div>
            <nav className="flex bg-white shadow-2xl p-5 justify-between items-center">
                <div className="text-2xl font-bold">
                    Coders
                </div>
                <div>
                    <ul className="flex">
                        <li className="mx-3 text-[16px] font-medium">Notes</li>
                        <li className="mx-3 text-[16px] font-medium">Create</li>
                        <li className="mx-3 text-[16px] font-medium">Login</li>
                        <li className="mx-3 text-[16px] font-medium">Signup</li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}