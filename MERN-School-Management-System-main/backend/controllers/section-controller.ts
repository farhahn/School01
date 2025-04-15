const Section = require('../models/section-model.ts');

// Create
exports.createSection = async (req, res) => {
    try {
        const newSection = new Section({ name: req.body.name });
        await newSection.save();
        res.status(201).json(newSection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read all
exports.getSections = async (req, res) => {
    try {
        const sections = await Section.find();
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update
exports.updateSection = async (req, res) => {
    try {
        const section = await Section.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        res.status(200).json(section);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete
exports.deleteSection = async (req, res) => {
    try {
        await Section.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Section deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
