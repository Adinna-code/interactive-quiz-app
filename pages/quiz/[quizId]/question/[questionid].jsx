import { useState, useEffect } from "react";
import Button from "@/components/Button";
import quizData from "../../data/quizData.json"
import Header from "@/components/Header"
import Link from "next/link";
import Question from "@/components/Question";
import Options from "@/components/Options";

export async function getStaticPaths() {
    const paths = [];

    quizData.categories.forEach((category) => {
        category.questions.forEach((_, index) => {
            paths.push({
                params: { quizId: category.name.toLowerCase(), questionid: (index + 1).toString() },
            })
        })
    })

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const category = quizData.categories.find(
        (cat) => cat.name.toLowerCase() === params.quizId
    )

    if(!category) {
        return { notFound: true};
    }

    const question = category.questions[parseInt(params.questionid, 10) -1]

    if (!question) {
        return { notFound: true }
    }

    return {
        props: {
            categoryName: category.name,
            question,
            questionIndex: parseInt(params.questionid, 10),
            quizId: params.quizId,
            totalQuestions: category.questions.length,
        }
    }
}

export default function QuestionPage({ categoryName, question, questionIndex, quizId, totalQuestions }) {
    
    const [feedback, setFeedback] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const nextQuestionIndex = questionIndex;

    useEffect(() => {
        setFeedback("");
        setIsCorrect(false);
        setAnswered(false);
        setIsSubmitted(false);
    }, [questionIndex])

    const checkAnswer = (e) => {
        e.preventDefault();

        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if(selectedAnswer) {
            const answerValue = selectedAnswer.value;
            setAnswered(true);
            setIsSubmitted(true);

            if(answerValue === question.correct) {
                setFeedback("Correct")
                setIsCorrect(true);
                setScore((prevScore) => prevScore + 1);
            } else {
                setFeedback(`Incorrect! The correct answer was: ${question.correct}`);
                setIsCorrect(false)
            }
        } else {
            setFeedback('<p style="color:red;">Please select an answer!</p>')
        }
    }
    

    return (
        <div>
            <Header/>
            <h1>{categoryName} - Question {questionIndex}</h1>
            <Question question={question.question}/>
            <form onSubmit={checkAnswer}>
                <Options answers={question.answers} isSubmitted={isSubmitted}/>

                <button type="submit" disabled={isSubmitted}>Submit Answer</button>
            </form>

            <p style={{color: isCorrect ? "green" : "red"}}>{feedback}</p>

            { answered && nextQuestionIndex < totalQuestions ? (
                <Link href={`/quiz/${quizId}/question/${nextQuestionIndex + 1}`}>
                    <Button/>
                </Link>
            ) : (
                answered && (
                    <div>
                        <p>Congratulations! You've completed the quiz.</p>
                        <Link href={`/quiz/results?score=${score}&totalQuestions=${totalQuestions}`}>
                            <button>View Results</button>
                        </Link>
                    </div>
                
                )
            )}
            <p>You're score is: {score}</p>
        </div>
    );
}
