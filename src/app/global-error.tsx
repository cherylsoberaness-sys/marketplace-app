"use client"

import { useEffect } from "react";
import { ErrorSection } from "./components/error-section";

type GlobalErrorProps = {
    error: Error & { digest?: string }
    reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
    useEffect(() => {
            console.error("Dashboard render failed", { digest: error.digest })
    }, [error]);

    return <ErrorSection
                title="App is not available."
                description="Try again. If the problem continues, comeback later."
                reset={reset}
            />
}