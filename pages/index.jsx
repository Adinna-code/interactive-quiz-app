import Link from "next/link"
import Header from "@/components/Header"
import Button from "@/components/Button"
import AddQuestion from "@/components/AddQuestion"

export default function Home() {
    return (
        <div className="flex flex-col items-center bg-gray-100 p-8 rounded-lg shadow-md">
            <Header />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome</h1>
            <p className="text-gray-600 mb-6">Please choose a category for your Quiz in the next page</p>
            <div className="flex flex-row gap-5 mt-5">
                <Link href={"/categories"}>
                    <Button text="Go to Categories" />
                </Link>
            </div>
            <p className="mt-4 mb-4 text-gray-600">Or maybe you want to add your own question?</p>
            <AddQuestion />
        </div>

    )
}