import Link from "next/link"

export default function AdNotFound() {
    
    return (
    <section>
        <p>404 Error</p>
        <h1>Ad not found</h1>
        <p>Identifier not valid or the ad no longer exists</p>
        <Link  href="/dashboard">Go to dashboard</Link>
    </section>)
    
}