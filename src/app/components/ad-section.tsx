import { AdDto } from "@/lib/ads.types"
import { AdCard } from "./ad-card";


type AdSectionProps = {
    ads: AdDto[];
}


export default async function AdSection({ ads }: AdSectionProps) {

    return (
        <>
            {ads.length === 0 ? (
                <p>There is not ads to show</p>
            ) : (
                <section className="space-y-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {ads.map((ad) => (
                        <AdCard key={ad.id} ad={ad} />    
                    ))}        
                </section>       
            )}
        </>
    )
}