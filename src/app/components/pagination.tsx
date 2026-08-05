import { adListHref, AdQuery } from "@/lib/ad-query";
import Link from "next/link"

type PaginationProps = {
    page: number;
    totalPages: number;
    input: AdQuery
}

export function Pagination({ page, totalPages, input }: PaginationProps) { 
    return (
        <nav aria-label="ads pagination" className="mt-6 flex items-center justify-center gap-4">
            {page > 1 ? (
                <Link href={adListHref(input, page - 1)} className="rounded-lg border border-zinc-300 px-4 py-2 transition hover:bg-gray-100">
                    {"<<"}
                </Link>
            ) : (
                <span aria-disabled="true" className="rounded-lg border border-zinc-300 px-4 py-2 text-zinc-400">
                    {"<<"}
                </span>     
            )}
        
            <span aria-current="page" className="text-sm text-zinc-600">
                Page <span className="font-semibold">{page}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
            </span>

            {page < totalPages ? (
                <Link href={adListHref(input, page + 1)} className="rounded-lg border border-zinc-300 px-4 py-2 transition hover:bg-gray-100">
                    {">>"}
                </Link>
            ) : (
                <span aria-disabled="true" className="rounded-lg border border-zinc-300 px-4 py-2 text-zinc-400">
                    {">>"}
                </span>     
            )}

        </nav>)
}