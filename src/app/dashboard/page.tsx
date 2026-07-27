import { getAds } from "@/lib/ads";
import AdSection from "../components/ad-section";

export default async function DashboardPage() {
    const ads = await getAds();

    console.log(ads);

    return (
        <main className="space-y-6">
            <AdSection ads={ads}/>
        </main>
    )
}