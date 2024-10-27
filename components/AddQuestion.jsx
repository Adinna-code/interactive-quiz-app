import { useState, useEffect } from "react";
import quizData from "../pages/quiz/data/quizData.json"

export default function AddQuestion() {
    const [formData, setFormData] = useState({
        category: 'HTML',
        question: '',
        options: ['', '', ''],
        correctAnswer: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

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
        if (!formData.options.includes(formData.correctAnswer)) {
            setError('Correct answer must match one of the options');
            return false;
        }
        setError('');
        return true;
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) return;

        setLoading(true);

        try {
            const newQuestion = {
                question: formData.question,
                answers: formData.options,
                correct: formData.correctAnswer,
            };

            let storedData = localStorage.getItem('additionalQuestions');
            let additionalQuestions = storedData ? JSON.parse(storedData) : {};

            if (!additionalQuestions[formData.category]) {
                additionalQuestions[formData.category] = [];
            }

            additionalQuestions[formData.category].push(newQuestion);

            localStorage.setItem('additionalQuestions', JSON.stringify(additionalQuestions));

            setSuccess('Question added successfully!');
            
            setFormData({
                category: formData.category,
                question: '',
                options: ['', '', ''],
                correctAnswer: '',
            });

            console.log('Updated questions in localStorage:', additionalQuestions);

        } catch (err) {
            setError('Error adding the question.');
            console.error('Error:', err);
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
                            Category
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={inputChange}
                        className="w-full p-2 border rounded-md"
                    >
                        {quizData.categories.map(category => (
                            <option key={category.name} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>                
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
                        placeholder="Enter your question"
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
        </div>
    );
}
