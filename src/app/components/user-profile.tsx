import { getSession } from "@/lib/auth";
import Link from "next/link";
import prisma from "@/lib/prisma"; 
import { logout } from "../login/actions";

export default async function UserProfile() {
    const session = await getSession();
    const user = session ? await prisma.user.findUnique({
        where: { id: session.userId }
    }) : null;

    const profileName = user?.email ?? "Invitado";


    return (
        <div className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-2">
            <span className="min-w-0">
                <span className="block text-xs text-muted-foreground">Profile</span>
                <span
                    className="block truncate text-sm font-medium text-foreground"
                    title={profileName}
                >
                    {profileName}
                </span>
            </span>
            {user ? (
                <form action={logout}>
                    <button className="cursor-pointer text-xs text-muted-foreground underline underline-offset-4" type="submit">
                        Logout
                    </button>
                </form>
            ) : (
                <Link className="ml-auto text-xs text-muted-foreground underline underline-offset-4" href="/login">
                    Login
                </Link>                    
            )}
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-card text-xs font-semibold text-foreground">
                {profileName.charAt(0).toLocaleUpperCase("es")}
            </span>
        </div>
    )
}