const CMS = require('../models/CMS');

// @desc    Get all CMS data as key-value pairs
// @route   GET /api/cms
// @access  Public
const getAllCMS = async (req, res) => {
  try {
    const entries = await CMS.find();
    const cmsMap = {};
    entries.forEach(entry => {
      cmsMap[entry.key] = entry.data;
    });
    console.log('CMS fetched successfully');
    res.json(cmsMap);
  } catch (error) {
    console.error('Error getting CMS data:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get CMS data by key
// @route   GET /api/cms/:key
// @access  Public
const getCMSByKey = async (req, res) => {
  try {
    const entry = await CMS.findOne({ key: req.params.key });
    if (!entry) {
      return res.status(404).json({ message: `CMS key '${req.params.key}' not found` });
    }
    res.json(entry.data);
  } catch (error) {
    console.error('Error getting CMS key:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update CMS data by key (upsert)
// @route   PUT /api/cms/:key
// @access  Private/Admin
const updateCMSByKey = async (req, res) => {
  try {
    const { data } = req.body;

    // Validate: only reject explicitly undefined or null, not empty arrays/strings
    if (data === undefined || data === null) {
      return res.status(400).json({ message: 'Data field is required and cannot be null or undefined' });
    }

    const key = req.params.key;

    const entry = await CMS.findOneAndUpdate(
      { key },
      { key, data },
      { upsert: true, returnDocument: 'after', runValidators: true }
    );

    console.log('CMS updated:', key);
    res.json(entry.data);
  } catch (error) {
    console.error('CMS update failed:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllCMS,
  getCMSByKey,
  updateCMSByKey
};
