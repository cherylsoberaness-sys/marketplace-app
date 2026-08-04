import { getAdsByFilter } from "@/lib/ads";
import AdSection from "../components/ad-section";
import { parseAdQuery, SearchParamValue } from "@/lib/ad-query";
import { SearchAdForm } from "../components/forms/search-ad-form";
import { Pagination } from "../components/pagination";

type DashboardPageProps = {
    searchParams: Promise<Record<string, SearchParamValue>>
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
    const queryParams = await searchParams;
    const formKey = JSON.stringify(queryParams);
    const input = parseAdQuery(queryParams);
    const { ads, totalPages } = await getAdsByFilter(input);

    return (
        <main className="space-y-6">
            <SearchAdForm key={formKey} query={input.query}  maxPrice={input.maxPrice} tags={input.tags} />
            <AdSection ads={ads} /> 
            {totalPages > 0 && (<Pagination page={input.page} totalPages={totalPages} input={input} />)}
        </main>
    )
}