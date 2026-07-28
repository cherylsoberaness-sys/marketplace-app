import { adListHref, AdQuery } from "@/lib/ad-query";
import Link from "next/link"

type PaginationProps = {
    page: number;
    totalPages: number;
    input: AdQuery
}

export function Pagination({ page, totalPages, input }: PaginationProps) { 
    return (
        <nav aria-label="ads pagination" className="flex gap-3">
            {page > 1 ? (
                <Link href={adListHref(input, page - 1)}>Previous</Link>
            ) : (
                <span aria-disabled="true">Previous</span>     
            )}
            
            <span aria-current="page">
                Page {page} of {totalPages}
            </span>

            {page < totalPages ? (
                <Link href={adListHref(input, page + 1)}>Next</Link>
            ) : (
                <span aria-disabled="true">Next</span>     
            )}
        </nav>)
}