import { parseAdId } from "@/lib/ad-query";
import { getAdById, getAdIds } from "@/lib/ads";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdCard } from "@/app/components/ad-card";
import { DeleteAdButton } from "@/app/components/delete-ad-button";
import { getSession } from "@/lib/auth";

type Props = {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    const ids = await getAdIds();

    return ids.map((id) => (
        {
            id: String(id)
        }
    
    ));
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const adId = parseAdId(id)

    if (adId === null) {
        notFound();
    }

    const adDetail = await getAdById(adId);

    if (!adDetail) {
        notFound();
    }

    return { 
        title: adDetail.title,
        description: `${adDetail.title} - $${adDetail.price}`
    }
}

export default async function AdDetailPage({ params }: Props) {
    const { id } = await params;
    const adId = parseAdId(id)

    if (adId === null) {
        notFound();
    }

    const session = await getSession();
    
    const adDetail = await getAdById(adId);

    if (!adDetail) {
        notFound();
    }


    return (
        <section className="grid gap-6">
            <AdCard hideTitle ad={adDetail} showOwner />
            {session?.userId === adDetail.ownerId && <DeleteAdButton adId={adId} />}
        </section>
    )
}