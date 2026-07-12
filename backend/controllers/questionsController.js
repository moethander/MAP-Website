import Question from '../models/questionsModel.js';

export const getQuestions = async (req, res) => {
    try {
        const age = parseInt(req.query.age);
        let group = "";

        if (age < 10) group = "under10";
        else if (age >= 10 && age <= 15) group = "10-15";
        else if (age >= 16 && age <= 20) group = "16-20";
        else group = "above20";

        const questions = await Question.find({ ageGroup: group });

        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};