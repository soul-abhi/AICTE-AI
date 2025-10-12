import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            default: 'My Resume'
        },
        template: {
            type: String,
            default: 'modern'
        },
        personal: {
            fullName: String,
            email: String,
            phone: String,
            location: String,
            website: String
        },
        summary: String,
        experiences: [
            {
                company: String,
                role: String,
                startDate: String,
                endDate: String,
                achievements: [String]
            }
        ],
        education: [
            {
                institution: String,
                degree: String,
                startDate: String,
                endDate: String,
                highlights: [String]
            }
        ],
        skills: [String],
        projects: [
            {
                name: String,
                description: String,
                link: String,
                tech: [String]
            }
        ],
        coverLetter: String
    },
    { timestamps: true }
);

export const Resume = mongoose.model('Resume', resumeSchema);
