import { generateAIContent } from '../services/aiService.js';

export const generateText = async (req, res) => {
    try {
        console.log('📥 AI generation request received');
        const { prompt, maxTokens = 200 } = req.body;

        if (!prompt) {
            console.log('❌ No prompt provided');
            return res.status(400).json({ error: 'Prompt is required' });
        }

        console.log(`📝 Generating text with ${maxTokens} max tokens...`);
        const text = await generateAIContent(prompt, maxTokens);
        console.log('✅ Text generated successfully');

        res.json({ text });
    } catch (error) {
        console.error('❌ Error in generateText controller:', error);
        res.status(500).json({ error: 'Failed to generate text', message: error.message });
    }
};
