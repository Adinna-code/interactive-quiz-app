import Link from "next/link";
import Header from "@/components/Header";
import quizData from "../data/quizData.json";


export async function getStaticPaths() {
    const paths = quizData.categories.map((category) => ({
        params: { quizId: category.name.toLowerCase() },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const category = quizData.categories.find(
        (cat) => cat.name.toLowerCase() === params.quizId
    );

    if (!category) {
        return { notFound: true};
    }

    return {
        props: {
            category,
        }
    }
}

export default function QuizPage({category}) {
    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            <Header />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{category.name} Quiz</h1>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
                {category.questions.map((question, index) => (
                    <li key={index} className="hover:text-[#BC6C25] hover:font-bold">
                        <Link href={`/quiz/${category.name.toLowerCase()}/question/${index + 1}`} className="hover:underline">
                            Question {index + 1}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )}