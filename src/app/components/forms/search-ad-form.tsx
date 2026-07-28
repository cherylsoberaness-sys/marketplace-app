import { AdQuery } from "@/lib/ad-query";
import Link from "next/link";

type SearchAdFormProps = Omit<AdQuery, "page">;

export function SearchAdForm({ query, maxPrice, tags }: SearchAdFormProps) {
    const tagsOptions = ['tech', 'home', 'sports', 'gaming', 'furniture'];

    return (
        <form className="flex gap-4" action={"/dashboard"} method="GET">
            <label htmlFor="query">Search:</label>
            <input id="query" name="query" className="border" defaultValue={query} />

            <label htmlFor="maxPrice">Max price:</label>
            <input id="maxPrice" name="maxPrice" className="border" defaultValue={maxPrice} />
            
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