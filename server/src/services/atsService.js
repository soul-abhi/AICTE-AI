const tokenize = (text = '') =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(Boolean);

export const computeATSScore = (resumeText = '', jobDescription = '', customKeywords = []) => {
    const resumeTokens = tokenize(resumeText);
    const jdTokens = tokenize(jobDescription);
    const keywords = [...new Set([...jdTokens, ...customKeywords.map((kw) => kw.toLowerCase())])];

    let matchCount = 0;
    keywords.forEach((keyword) => {
        if (resumeTokens.includes(keyword)) {
            matchCount += 1;
        }
    });

    const score = keywords.length ? Math.round((matchCount / keywords.length) * 100) : 0;
    const missingKeywords = keywords.filter((kw) => !resumeTokens.includes(kw));
    const matchedKeywords = keywords.filter((kw) => resumeTokens.includes(kw));

    return {
        score,
        matchedKeywords,
        missingKeywords,
        tips: [
            'Mirror critical terms and skills from the job posting.',
            'Use measurable achievements to highlight impact.',
            'Maintain clear headings and bullet points for readability.'
        ]
    };
};
