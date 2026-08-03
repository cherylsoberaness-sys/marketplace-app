import { AdQuery } from "@/lib/ad-query";
import Link from "next/link";

type SearchAdFormProps = Omit<AdQuery, "page">;

export function SearchAdForm({ query, maxPrice, tags }: SearchAdFormProps) {
    const tagsOptions = ['tech', 'home', 'sports', 'gaming', 'furniture'];

    return (
        <form className="mb-8 rounded-2xl border border-dashed border-gray-300 bg-white
            p-6 shadow-sm space-y-6" action={"/dashboard"} method="GET">
            
            <div className="grid gap-4 md:grid-cols-[1fr_220px_auto]">
                <div>
                    <label htmlFor="query" className="mb-2 block text-sm font-medium">Search:</label>
                    <input id="query" name="query" placeholder="Search ads..." className="w-full rounded-lg border px-4 py-2
                        focus:outline-none focus:ring-2" defaultValue={query} />
                </div>
        
           
            
                <div>
                    <label htmlFor="maxPrice" className="mb-2 block text-sm font-medium">Max price:</label>
                    <input id="maxPrice" name="maxPrice" className="w-full rounded-lg border px-4 py-2
                        focus:outline-none focus:ring-2" defaultValue={maxPrice} />
                </div>
                <div className="flex items-end gap-2">
                    <button type="submit" className="cursor-pointer rounded-lg border px-5 py-2 transition hover:bg-black hover:text-white">
                        Apply
                    </button >
                    <Link href="/dashboard" className="rounded-lg border px-5 py-2 transition hover:bg-gray-100">Clear</Link>
                </div>
                
                <div className="flex flex-wrap gap-3">
                    {tagsOptions.map((tag) => (
                        <label key={tag} className="flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition hover:bg-gray-100">
                            {tag}
                            <input type="checkbox" name="tags" value={tag} defaultChecked={tags.includes(tag)} />        
                        </label>
                    ))}
                </div>
            </div>
            
        </form>
    )
}