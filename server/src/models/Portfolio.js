import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        theme: {
            type: String,
            default: 'light'
        },
        about: String,
        skills: [String],
        projects: [
            {
                name: String,
                description: String,
                link: String,
                tech: [String]
            }
        ],
        contact: {
            email: String,
            phone: String,
            socials: [
                {
                    platform: String,
                    url: String
                }
            ]
        },
        shareSlug: {
            type: String,
            unique: true
        }
    },
    { timestamps: true }
);

export const Portfolio = mongoose.model('Portfolio', portfolioSchema);
