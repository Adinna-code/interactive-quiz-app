import Link from "next/link"
import Header from "@/components/Header"

export default function Categories() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <Header />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">This is your categories</h1>
            <p className="text-gray-600 mb-6">Please choose one of them.</p>
            <div className="flex flex-row mt-5 gap-4">
                <Link href="/quiz/html" className="hover:underline hover:font-bold">HTML</Link>
                <Link href="/quiz/css" className="hover:underline hover:font-bold">CSS</Link>
                <Link href="/quiz/javascript" className="hover:underline hover:font-bold">JavaScript</Link>
            </div>
        </div>
    )
}