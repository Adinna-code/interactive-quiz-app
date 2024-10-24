import Link from "next/link"
import Header from "@/components/Header"

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            <Header />
            <h1>Welcome</h1>
            <p>Please choose a category for your Quiz in next page</p>
            <div className="flex flex-row gap-5 mt-5">
                <Link href="/categories">HTML</Link>
                <Link href="/categories">CSS</Link>
                <Link href="/categories">JavaScript</Link>
            </div>
        </div>
    )
}