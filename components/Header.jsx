import Link from "next/link"

export default function Header() {
    return(
        <div>
            <nav className="flex gap-10 font-bold mb-7">
                <Link href="/">Home</Link>
                <Link href="/categories">Categories</Link>
            </nav>
        </div>
    )
}