import { AdDto } from "@/lib/ads.types"
import Link from "next/link";

type AdCardProps = {
    ad: AdDto;
    hideTitle?: boolean;
    showOwner?: boolean;
    clickable?: boolean;
}


export async function AdCard({ ad, hideTitle = false, showOwner = false, clickable = true}: AdCardProps) {
    const card = (
        <article className="border-dashed border-zinc-300 flex h-65 w-65 flex-col rounded-[7px] border-2 bg-[#f7f7f3] p-4 transition-transform hover:-translate-y-0.5">
            {!hideTitle && (
                <h2 className="font-semibold">
                    {ad.title}
                </h2>
            )}
            <p className="mt-2 line-clamp-3 text-sm text-gray-700">{ad.description}</p>
            <div className="mt-4 space-y-1 text-sm">
                <p>${ad.price}</p>
                <p className="line-clamp-1">
                    {ad.tags.map((tag) => `#${tag}`).join(' ')}
                </p>
                <p>❤️ {ad.likes}</p>
                <p>{ad.createdAt.toLocaleDateString()}</p>
                {(showOwner && <p>{ad.owner?.email}</p>)}
            </div>
        </article>
    );

    if (!clickable) {
        return card
    }
    
    return (
        <Link href={`/dashboard/ads/${ad.id}`}>
            {card}
        </Link>
    )
    

}