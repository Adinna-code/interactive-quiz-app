import { useState } from 'react';

export default function Question({ 
    questionData, 
    isSubmitted, 
    feedback, 
    isCorrect, 
    score, 
    onAnswerSubmit 
}) {
    const [selectedAnswer, setSelectedAnswer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedAnswer) {
            onAnswerSubmit(selectedAnswer);
        } else {
            alert('Please select an answer!');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">
                    {questionData.categoryName} - Question {questionData.currentIndex}
                </h1>
                <h2 className="text-xl mb-4">{questionData.question}</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    {questionData.answers.map((answer, index) => (
                        <div key={index} className="flex items-center">
                            <input
                                type="radio"
                                id={`answer-${index}`}
                                name="answer"
                                value={answer}
                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                disabled={isSubmitted}
                                className="mr-2"
                            />
                            <label htmlFor={`answer-${index}`} className="text-lg">
                                {answer}
                            </label>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitted}
                    className={`px-4 py-2 rounded ${
                        isSubmitted 
                            ? 'bg-gray-400' 
                            : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                >
                    Submit Answer
                </button>
            </form>

            {feedback && (
                <div className={`mt-4 p-3 rounded ${
                    isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {feedback}
                </div>
            )}

            <div className="mt-4">
                <p className="text-lg">Current Score: {score}</p>
            </div>
        </div>
    );
}

/* import { useEffect, useState } from "react";
import Options from "./Options";

export default function Question({onNext}) {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [categories, setCategories] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [question, setQuestion] = useState(null)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch('/api/questions');
                const data = await res.json();
                if (data.categories) {
                    setCategories(data.categories); 
                    setQuestion(data.categories[0].question[0])
                } else {
                    console.error('No categories found in data:', data);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        }

        fetchQuestions();
    }, [])

    const handleNext = () => {
        if (onNext) {
            onNext(); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        handleNext();
    };

    return (
        <div>
            { question ? (
                <div>
                    <h3>{question.question}</h3>
                    <ul>
                        <Options 
                            answers={question.answers} 
                            isSubmitted={isSubmitted} 
                        />
                    </ul>
                    <Button />
                </div>
            ) : (
                <p>Loading questions...</p>
            )}
        </div>
    )
}
 */