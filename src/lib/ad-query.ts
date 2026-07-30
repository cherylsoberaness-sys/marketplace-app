import { z } from "zod";

export type SearchParamValue = string | string[] | undefined

export type AdQuery = { 
    query: string;
    maxPrice?: number;
    tags: string[];
    page: number;
}


const PRISMA_INT_MAX = 2_147_483_647;

const idSchema = z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
    .pipe(
        z.number()
            .int()
            .max(PRISMA_INT_MAX)
    )


function first(value: SearchParamValue): string {
    return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function toArray(value: SearchParamValue): string[] {
    if (Array.isArray(value)) return value;
    if (value) return [value];

    return [];
}



export function parseAdQuery(queryParams: Record<string, SearchParamValue>): AdQuery {
    const maxPriceRaw = first(queryParams.maxPrice);

    const query = first(queryParams.query);
    const maxPriceValue = Number(maxPriceRaw);
    const tags = toArray(queryParams.tags);
    const page = Number(first(queryParams.page));

    return {
        query,
        maxPrice: maxPriceRaw !== "" && Number.isInteger(maxPriceValue) && maxPriceValue >= 0 ? maxPriceValue  : undefined,
        tags,
        page: Number.isInteger(page) && page >= 1 ? page : 1
    }
}

function adQueryParams(input: AdQuery, page: number) {
    const params = new URLSearchParams();

    if (input.query) params.set("query", input.query);
    if (input.maxPrice !== undefined) params.set("maxPrice", String(input.maxPrice));
    if (input.tags.length > 0) input.tags.forEach((tag) => params.append("tags", tag));
    if (page > 1) params.set("page", String(page));

    return params;
}

export function adListHref(input: AdQuery, page: number): string {
    const queryString = adQueryParams(input, page).toString();
    return queryString ? `/dashboard?${queryString}` : "/dashboard";
}

export function parseAdId(value: unknown): number | null {
    const result = idSchema.safeParse(value);
    
    return result.success ? result.data : null;
}