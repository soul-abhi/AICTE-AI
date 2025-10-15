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
        
        if (!text || text.trim() === '') {
            console.log('❌ Generated text is empty');
            return res.status(500).json({ 
                error: 'Failed to generate content', 
                message: 'Generated content was empty' 
            });
        }
        
        console.log('✅ Text generated successfully');
        res.json({ text });
    } catch (error) {
        console.error('❌ Error in generateText controller:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ 
            error: 'Failed to generate text', 
            message: error.message || 'Unknown error occurred' 
        });
    }
};
