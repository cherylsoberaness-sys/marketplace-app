import Link from "next/link"

export default function AdNotFound() {
    
    return (
    <section className="space-y-1">
        <p>404 Error</p>
        <h1>Ad not found</h1>
        <p>Identifier not valid or the ad no longer exists</p>
        <Link  href="/dashboard" className="rounded-lg border cursor-pointer py-2  px-2 transition hover:bg-black hover:text-white">Go to dashboard</Link>
    </section>)
    
}