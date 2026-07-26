import UserProfile from "./user-profile";
import Link from "next/link";


export default function Navbar() {
    return (
        <nav className="relative flex w-full items-center">
            <Link className="absolute left-1/2 -translate-x-1/2 text-xs underline underline-offset-4" href="/dashboard">
                Store
            </Link>

            <div className="ml-auto flex items-center gap-4">
                <UserProfile />
            </div>
        </nav>
    )
}