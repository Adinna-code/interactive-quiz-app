import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import Question from "@/components/Question";
import Header from "@/components/Header";
import Button from "@/components/Button";

export default function QuestionPage() {
    const router = useRouter();
    const { quizId, questionid } = router.query;
    
    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Fetch quiz data from API
    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await fetch('/api/questions');
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz data');
                }
                const data = await response.json();
                setQuizData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (quizId && questionid) {
            fetchQuizData();
        }
    }, [quizId, questionid]);

    useEffect(() => {
        setFeedback("")
        setIsCorrect(false);
        setAnswered(false);
        setIsSubmitted(false);
    }, [questionid])

    // Set current question when data is loaded
    useEffect(() => {
        if (quizData && quizId && questionid) {
            const category = quizData.categories.find(
                cat => cat.name.toLowerCase() === quizId
            );
            
            if (category) {
                const question = category.questions[parseInt(questionid) - 1];
                if (question) {
                    setCurrentQuestion({
                        ...question,
                        categoryName: category.name,
                        totalQuestions: category.questions.length,
                        currentIndex: parseInt(questionid)
                    });
                } else {
                    setError('Question not found');
                }
            } else {
                setError('Category not found');
            }
        }
    }, [quizData, quizId, questionid]);

    const handleAnswerSubmit = (selectedAnswer) => {
        setAnswered(true);
        setIsSubmitted(true);

        if (selectedAnswer === currentQuestion.correct) {
            setFeedback("Correct!");
            setIsCorrect(true);
            setScore(prevScore => prevScore + 1);
        } else {
            setFeedback(`Incorrect! The correct answer was: ${currentQuestion.correct}`);
            setIsCorrect(false);
        }
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
    if (!currentQuestion) return <div className="text-center py-8">Question not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <Header />
            <Question 
                questionData={currentQuestion}
                isSubmitted={isSubmitted}
                feedback={feedback}
                isCorrect={isCorrect}
                score={score}
                onAnswerSubmit={handleAnswerSubmit}
            />

            {answered && currentQuestion.currentIndex < currentQuestion.totalQuestions ? (
                <Link href={`/quiz/${quizId}/question/${currentQuestion.currentIndex + 1}`}>
                    <Button text="Next Question" />
                </Link>
            ) : answered && (
                <div className="text-center py-4">
                    <p className="text-xl mb-4">Congratulations! You've completed the quiz.</p>
                    <Link href={`/quiz/results?score=${score}&totalQuestions=${currentQuestion.totalQuestions}`}>
                        <Button text="View Results" />
                    </Link>
                </div>
            )}
        </div>
    );
}