import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import atsRoutes from './routes/atsRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

const app = express();

const allowedOrigins = process.env.CLIENT_ORIGIN?.split(',').map((origin) => origin.trim());
app.use(
    cors({
        origin: allowedOrigins ?? '*',
        credentials: true
    })
);
app.use(helmet());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/ats', atsRoutes);
app.use('/api/ai', aiRoutes);

app.use(errorHandler);

const port = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`API running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    });
