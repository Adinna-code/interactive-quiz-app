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
        <div>
            <Header/>
            <h1>{category.name} Quiz</h1>
            <ul>
            {category.questions.map((question, index) => (
                <li key={index}>
                    <Link href={`/quiz/${category.name.toLowerCase()}/question/${index + 1}`}>
                        Question {index + 1}
                    </Link>
                </li>
            ))}
            </ul>
        </div>
    )}