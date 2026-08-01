"use client";

import { useEffect } from "react";
import { ErrorSection } from "../components/error-section";

type DashboardErrorProps = {
    error: Error & { digest?: string };
    reset: () => void
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
    useEffect(() => {
        console.error("Dashboard render failed", { digest: error.digest })
    }, [error]);

    return <ErrorSection
                title="We couldn't show this part of the dashboard."
                description="You can try again or go back to a stable area."
                reset={reset}
                backHref="/dashboard"
                backLabel="Go back to dashboard"
            />
}