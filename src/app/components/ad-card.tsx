import { AdDto } from "@/lib/ads.types"
import Link from "next/link";

type AdCardProps = {
    ad: AdDto;
    hideTitle?: boolean;
}


export function AdCard({ ad, hideTitle = false }: AdCardProps) {
    
    return (
        <article className="size-65 rounded-[7px] border-2 border-zinc-900 bg-[#f7f7f3] p-4 transition-transform hover:-translate-y-0.5 justify-center items-center">
            {!hideTitle && (
                <h2>
                    <Link href={`/dashboard/ads/${ad.id}`}>
                        {ad.title}
                    </Link>
                </h2>
            )}
            <p>{ad.description}</p>
            <p>{ad.price}</p>
            <p>{ad.tags}</p>
            <p>{ad.price}</p>
            <p>{ad.likes}</p>
            <p>{ ad.createdAt.toLocaleDateString() }</p>
        </article>
    )

}