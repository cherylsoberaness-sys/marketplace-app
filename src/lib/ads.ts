import { AdQuery } from "./ad-query";
import { AdDto } from "./ads.types";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

export type AdsResult = {  
    ads: AdDto[],
    totalPages: number,
    total: number
}

const AD_PAGE_SIZE = 4;

export async function getAds(): Promise<AdDto[]> {
    const ads = await prisma.ad.findMany({
        include: {
            owner: true,
        },
    });

    return ads
}


export async function getAdsByFilter({ query, maxPrice, tags, page }: AdQuery): Promise<AdsResult> {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const where: Prisma.AdWhereInput = {
        ...(query !== "" && {
            OR: [
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } }
            ],
        }),
        ...(tags.length > 0 && {
            tags: {
                hasSome: tags,
            },
        }),
        ...(maxPrice !== undefined && {
            price: {
                lte: maxPrice,
            }
        }),
    }

    const total = await prisma.ad.count({ where });
    const totalPages = Math.ceil(total / AD_PAGE_SIZE);

    if (page > totalPages) {
        return {
            ads: [],
            total,
            totalPages,
        }
    }
    
    const ads = await prisma.ad.findMany({
        where,
        skip: (page - 1) * AD_PAGE_SIZE,
        take: AD_PAGE_SIZE
    });

    return {
        ads: ads,
        totalPages,
        total
    }
}