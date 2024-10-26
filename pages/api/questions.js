import quizData from "../quiz/data/quizData.json";

export default function apiHandler(req, res) {
    res.status(200).json(quizData)
}