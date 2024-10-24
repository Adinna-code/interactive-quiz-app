import Link from "next/link"
import Header from "@/components/Header"

export default function Categories() {
    return (
        <div>
            <Header/>
            <h1>This is your categories</h1>
            <p>Please choose one of them.</p>
            <div className="flex flex-col mt-5 gap-2">
                <Link href="/quiz/html">HTML</Link>
                <Link href="/quiz/css">CSS</Link>
                <Link href="/quiz/javascript">JavaScript</Link>
            </div>
        </div>
    )
}