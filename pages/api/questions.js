import fs from 'fs';
import path from 'path';
import quizData from "../quiz/data/quizData.json";

const filePath = path.join(process.cwd(), 'quiz/data/quizData.json');

export default function apiHandler(req, res) {

    if (req.method === 'POST') {
        const newQuestion = req.body;

        const categoryIndex = 0;

        if (quizData.categories[categoryIndex]) {
            const updatedQuestions = [...quizData.categories[categoryIndex].questions, newQuestion];

            quizData.categories[categoryIndex].questions = updatedQuestions;

            try {
                fs.writeFileSync(filePath, JSON.stringify(quizData, null, 2));
                res.status(200).json({message: 'Question added succefully!'});
            } catch(error) {
                res.status(500).json({error: 'Error to save the new question.'});
            }
        } else {
        res.status(400).json({error: 'Wrong method'})
        }
    } else {
        res.status(200).json(quizData);
    }
}