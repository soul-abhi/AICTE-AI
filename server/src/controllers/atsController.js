import { computeATSScore } from '../services/atsService.js';

export const evaluateATS = async (req, res) => {
    const { resumeText, jobDescription, keywords = [] } = req.body;

    const result = computeATSScore(resumeText, jobDescription, keywords);

    res.json(result);
};
