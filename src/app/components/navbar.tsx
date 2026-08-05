
import { getSession } from "@/lib/auth";
import UserProfile from "./user-profile";
import Link from "next/link";


export default async function Navbar() {
    const session = await getSession();

    return (
        <nav className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-3">
                <UserProfile />
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs underline underline-offset-4 md:absolute md:left-1/2 md:-translate-x-1/2">
                <Link href="/dashboard">
                    Store
                </Link>
                <Link href="/">
                    Home
                </Link>
                {session && <Link href={"/dashboard/ads/create"}>Create ad</Link>}
            </div>
        </nav>
    )
}