
import { getSession } from "@/lib/auth";
import UserProfile from "./user-profile";
import Link from "next/link";


export default async function Navbar() {
    const session = await getSession();

    return (
        <nav className="relative flex w-full items-center">
            <div className="absolute left-1/2 flex -translate-x-1/2 gap-4 text-xs underline underline-offset-4">
                <Link href="/dashboard">
                    Store
                </Link>
                <Link href="/">
                    Home
                </Link>
                {session && <Link href={"/dashboard/ads/create"}>Create ad</Link>}
            </div>

            <div className="ml-auto flex items-center gap-4">
                <UserProfile />
            </div>
        </nav>
    )
}