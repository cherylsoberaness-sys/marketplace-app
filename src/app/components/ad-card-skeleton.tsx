export default function AdCardSkeleton() {
    return (
        <article className="size-65 rounded-[7px] border-2 border-zinc-900 bg-[#f7f7f3] p-4">
            {/* Title */}
            <div className="h-5 w-3/4 animate-pulse rounded bg-gray-300" />
            {/* Description */}
            <div className="mt-3 space-y-2">
                <div className="h-4 w-5/6 animate-pulse rounded bg-gray-300" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-300" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-gray-300" />
            </div>
            {/* Price */}
            <div className="mt-3 h-4 w-1/4 animate-pulse rounded bg-gray-300" />

            {/* Tags */}
            <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-gray-300" />

            {/* Extra data */}
            <div className="mt-2 h-4 w-1/6 animate-pulse rounded bg-gray-300" />
            <div className="mt-2 h-4 w-1/4 animate-pulse rounded bg-gray-300" />
        </article>
    )
}