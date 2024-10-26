import { useState, useEffect } from "react";

export default function AddQuestion() {
    const [formData, setFormData] = useState({
        question: '',
        options: ['', '', ''],
        correctAnswer: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
        setQuestions(Array.isArray(storedQuestions) ? storedQuestions : []);
    }, []);

    const inputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const optionsChange = (index, value) => {
        setFormData(prev => ({
            ...prev,
            options: prev.options.map((option, i) => i === index ? value : option)
        }));
    };

    const validateForm = () => {
        if (!formData.question.trim()) {
            setError('Question is required');
            return false;
        }
        if (formData.options.some(option => !option.trim())) {
            setError('All options are required');
            return false;
        }
        if (!formData.correctAnswer.trim()) {
            setError('Correct answer is required');
            return false;
        }
        return true;
    };

    const saveToLocal = (newQuestion) => {
        try {
            const existingQuestions = JSON.parse(localStorage.getItem('questions'));
    
            const questionsArray = Array.isArray(existingQuestions) ? existingQuestions : [];
    
            const updatedQuestions = [...questionsArray, newQuestion];
            localStorage.setItem('questions', JSON.stringify(updatedQuestions));
        } catch (err) {
            throw new Error('Save to local storage failed');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) return;

        setLoading(true);

        try {
            const newQuestion = {
                question: formData.question,
                answers: formData.options,
                correctAnswer: formData.correctAnswer,
            };

            saveToLocal(newQuestion);
            setQuestions(prev => [...prev, newQuestion]);

            setSuccess('The question was added successfully');

            setFormData({
                question: '',
                options: ['', '', ''],
                correctAnswer: '',
            });
        } catch (err) {
            setError('The question was not added. Please try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add a new question</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Enter a new question
                    </label>
                    <input
                        type="text"
                        name="question"
                        value={formData.question}
                        onChange={inputChange}
                        className="w-full p-2 border rounded-md"
                        placeholder="Question"
                    />
                </div>

                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Options
                    </label>
                    {formData.options.map((option, index) => (
                        <input
                            key={index}
                            type="text"
                            value={option}
                            onChange={(e) => optionsChange(index, e.target.value)}
                            className="w-full p-2 border rounded-md mb-2"
                            placeholder={`Option ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Correct answer
                    </label>
                    <input
                        type="text"
                        name="correctAnswer"
                        value={formData.correctAnswer}
                        onChange={inputChange}
                        className="w-full p-2 border rounded-md"
                        placeholder="Add the correct answer"
                    />
                </div>

                {error && (
                    <div className="text-red-600 text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="text-green-600 text-sm">
                        {success}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-2 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-orange-900 hover:bg-orange-800'} transition-colors`}
                >
                    {loading ? 'Adding...' : 'Add the question'}
                </button>
            </form>

            {/* Displaying the saved questions */}
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Saved Questions</h3>
                {questions.length === 0 ? (
                    <p>No questions added yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {questions.map((q, index) => (
                            <li key={index} className="p-4 bg-gray-100 rounded-lg shadow">
                                <h4 className="font-bold">{q.question}</h4>
                                <ul className="mt-2">
                                    {q.answers.map((answer, idx) => (
                                        <li key={idx}>{answer}</li>
                                    ))}
                                </ul>
                                <p className="mt-2 text-sm text-green-600">Correct answer: {q.correctAnswer}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
