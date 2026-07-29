import UserProfile from "./user-profile";
import Link from "next/link";


export default function Navbar() {
    return (
        <nav className="relative flex w-full items-center">
            <div className="absolute left-1/2 flex -translate-x-1/2 gap-4 text-xs underline underline-offset-4">
                <Link href="/dashboard">
                    Store
                </Link>
                <Link href="/">
                    Home
                </Link>
            </div>

            <div className="ml-auto flex items-center gap-4">
                <UserProfile />
            </div>
        </nav>
    )
}