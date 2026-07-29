import AdCardSkeleton from "../components/ad-card-skeleton"


export default function Loading() {
    return (
        <section aria-busy="true" aria-labelledby="dashboard-loading-title" className="w-full">
            <h1 id="dashboard-loading-title" className="text-2xl font-bold text-center">
                Loading ads...
            </h1>
            <p className="sr-only" role="status">
                Loading ads...
            </p>
            <div aria-hidden="true" className="space-y-4 grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 4 }, (_, index) => (
                    <AdCardSkeleton key={index}/>
                ))}
            </div>

        </section>
    )
}