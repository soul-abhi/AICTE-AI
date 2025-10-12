import { Portfolio } from '../models/Portfolio.js';

const slugify = (value) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/gi, '-')
        .replace(/^-|-$/g, '');

export const upsertPortfolio = async (req, res) => {
    const shareSlug = req.body.shareSlug || slugify(req.user.name || 'portfolio');
    const payload = {
        ...req.body,
        shareSlug,
        owner: req.user._id
    };

    const portfolio = await Portfolio.findOneAndUpdate(
        { owner: req.user._id },
        payload,
        { new: true, upsert: true }
    );

    res.json(portfolio);
};

export const getPortfolio = async (req, res) => {
    const portfolio = await Portfolio.findOne({ owner: req.user._id });
    if (!portfolio) {
        return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
};

export const getPublicPortfolio = async (req, res) => {
    const portfolio = await Portfolio.findOne({ shareSlug: req.params.slug })
        .populate('owner', 'name');

    if (!portfolio) {
        return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.json(portfolio);
};
