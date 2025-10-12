import { Resume } from '../models/Resume.js';
import { generateResumePDF } from '../services/pdfService.js';

export const upsertResume = async (req, res) => {
    const payload = {
        ...req.body,
        owner: req.user._id
    };

    const resume = await Resume.findOneAndUpdate(
        { owner: req.user._id },
        payload,
        { new: true, upsert: true }
    );

    res.json(resume);
};

export const getResume = async (req, res) => {
    const resume = await Resume.findOne({ owner: req.user._id });
    if (!resume) {
        return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
};

export const downloadResume = async (req, res) => {
    const resume = await Resume.findOne({ owner: req.user._id });
    if (!resume) {
        return res.status(404).json({ message: 'Resume not found' });
    }

    const pdfBuffer = await generateResumePDF(resume);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
    res.send(pdfBuffer);
};
