import Link from "next/link";

type ErrorSectionProps = {
    title: string;
    description: string;
    reset: () => void;
    backHref?: string;
    backLabel?: string;
}


export function ErrorSection({title, description, reset, backHref, backLabel}: ErrorSectionProps) {
    return (
        <section className="mx-auto grid max-w-xl gap-4 py-10">
            <p className="text-sm font-medium text-muted-foreground">Unexpected error</p>
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
            <div className="flex flex-wrap gap-3">
                <button
                    className="cursor-pointer rounded-lg bg-foreground px-4 py-2 text-background"
                    onClick={reset} type="button"
                >
                    Try again
                </button>
                {backHref && backLabel && (
                    <Link
                        className="rounded-lg border border-border px-4 py-2"
                        href={backHref}
                    >
                        {backLabel}
                    </Link>

                )}
            </div>
        </section>
    )
}