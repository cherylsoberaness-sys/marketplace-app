import { getAds } from "@/lib/ads";

export default async function DashboardPage() {
    const ads = await getAds()

    console.log(ads);

    return (
        <div className="space-y-4">
            <h1>Marketplace</h1>
            {ads.map((ad) => (
                 
                <div className="border p-4" key={ad.id}>
                    <h2>{ad.title}</h2>
                    <p>{ad.description}</p>
                    <p>Price: ${ad.price}</p>
                    <p>Owner: { ad.owner?.email }</p>
                    <p>Likes: {ad.likes}</p>
                </div>
            ))}
        </div>
    )
}