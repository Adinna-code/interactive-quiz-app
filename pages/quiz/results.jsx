import Link from "next/link";
import Button from "@/components/Button";

export async function getServerSideProps({ query }) {
    const score = parseInt(query.score) || 0;
    const totalQuestions = parseInt(query.totalQuestions) || 0;
    
    const message = score / totalQuestions >= 0.5
    ? "Congrats! You've done an excellent work!"
    :"Try again, you can do better!";
     
    return {
        props: {
            score,
            totalQuestions,
            message,
        }
    }
}

export default function ResultsPage({ score, totalQuestions, message}) {
    return (
        <div>
            <h1>Your Results</h1>
            <p>Total questions: {totalQuestions}</p>
            <p>Correct answers: {score}</p>
            <p>{message}</p>
            <Link href={`/categories`}>
                <Button text="Back to categories"/>
            </Link>
        </div>
    )
}