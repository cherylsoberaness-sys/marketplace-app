import { AdQuery } from "@/lib/ad-query";
import Link from "next/link";

type SearchAdFormProps = Omit<AdQuery, "page">;

export function SearchAdForm({ query, maxPrice, tags }: SearchAdFormProps) {
    const tagsOptions = ['tech', 'home', 'sports', 'gaming', 'furniture'];

    return (
        <form className="mb-8 rounded-2xl border border-dashed border-gray-300 bg-white
            p-6 shadow-sm space-y-6" action={"/dashboard"} method="GET">
            
            <div>
                <label htmlFor="query" className="mb-2 block text-sm font-medium">Search:</label>
                <input id="query" name="query" placeholder="¨Search ads..." className="w-full rounded-lg border px-4 py-2
                    focus:outline-none focus:ring-2" defaultValue={query} />
            </div>
            
            <div>
                <label htmlFor="maxPrice" className="mb-2 block text-sm font-medium">Max price:</label>
                <input id="maxPrice" name="maxPrice" className="w-full rounded-lg border px-4 py-2
                    focus:outline-none focus:ring-2" defaultValue={maxPrice} />
            </div>
            
            {tagsOptions.map((tag) => (
                <label key={tag} className="flex items-center gap-2">
                    {tag}
                    <input type="checkbox" name="tags" value={tag} defaultChecked={tags.includes(tag)} />        
                </label>
            ))} 
            <button type="submit">Apply</button>
            <Link href="/dashboard">Clean filters</Link>
        </form>
    )
}