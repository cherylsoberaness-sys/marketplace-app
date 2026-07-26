import { AdDto } from "./ads.types";
import  prisma  from "@/lib/prisma";

export type Ads = AdDto[]

export async function getAds(): Promise<Ads> {
    const ads = await prisma.ad.findMany({
        include: {
            owner: true,
        },
    });

    return ads
}