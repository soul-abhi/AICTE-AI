import { generateAIContent } from '../services/aiService.js';

export const generateText = async (req, res) => {
    const { prompt, maxTokens = 200 } = req.body;

    const text = await generateAIContent(prompt, maxTokens);

    res.json({ text });
};
