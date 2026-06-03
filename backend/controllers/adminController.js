const jwt = require('jsonwebtoken');

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    // Generate JWT token
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

module.exports = {
  loginAdmin
};
