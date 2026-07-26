import Link from "next/link";

export default async function UserProfile() {
    const profileName = "Invitado";

    return (
        <div className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-2">
            <Link rel="ml-auto text-xs text-muted-foreground underline underline-offset-4" href="/login">
                Entrar
            </Link>
            <span className="min-w-0">
                <span className="block text-xs text-muted-foreground">Perfil</span>
                <span
                    className="block truncate text-sm font-medium text-foreground"
                    title={profileName}
                >
                    {profileName}
                </span>
            </span>
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-card text-xs font-semibold text-foreground">
                {profileName.charAt(0).toLocaleUpperCase("es")}
            </span>
        </div>
    )
}