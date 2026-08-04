import { AdDto } from "@/lib/ads.types"

type AdDetailProps = {
    ad: AdDto; 
}

export function AdDetail({ ad }: AdDetailProps) {
    return (
        <article className="flex w-full max-w-xl flex-col rounded-[7px] border-2 border-dashed border-zinc-300 bg-[#f7f7f3] p-8 shadow-sm">
            <h2 className="text-3xl font-bold">
                {ad.title}
            </h2>
            <p className="mt-6 whitespace-pre-wrap text-base leading-7 text-gray-700">
                {ad.description}
            </p>
            <div className="mt-8 space-y-3 border-t border-zinc-300 pt-6">
                <p className="text-lg font-semibold">${ad.price}</p>
                <p className="flex flex-wrap gap-2">
                    {ad.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-zinc-300 px-3 py-1 text-sm">
                            #{tag}
                        </span>
                    ))}
                </p>
                <p>❤️ {ad.likes}</p>
                <p> {ad.createdAt.toLocaleDateString()}</p>
                <p> {ad.owner?.email}</p>
            </div>
        </article>
    );
}