const Fclass = require("../models/fclass-model.ts"); // Fclass model

// ✅ Create a new Fclass
exports.createFclass = async (req, res) => {
    try {
        const { name, sections } = req.body;
        const newFclass = new Fclass({ name, sections });
        await newFclass.save();
        res.status(201).json(newFclass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get all Fclasses
exports.getFclasses = async (req, res) => {
    try {
        const fclasses = await Fclass.find();
        res.status(200).json(fclasses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get a single Fclass by ID
exports.getFclassDetail = async (req, res) => {
    try {
        const fclass = await Fclass.findById(req.params.id);
        if (!fclass) return res.status(404).json({ message: "Fclass not found" });
        res.status(200).json(fclass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Update an Fclass
exports.updateFclass = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFclass = await Fclass.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedFclass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Delete an Fclass
exports.deleteFclass = async (req, res) => {
    try {
        const { id } = req.params;
        await Fclass.findByIdAndDelete(id);
        res.status(200).json({ message: "Fclass deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
