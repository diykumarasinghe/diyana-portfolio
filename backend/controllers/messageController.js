const Message = require('../models/Message');
const { sendContactEmail } = require('../utils/emailHelper');

// @desc    Create new contact message
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const newMessage = await Message.create({
      name,
      email,
      message
    });

    console.log('Message saved successfully');

    // Attempt to send email notification
    try {
      await sendContactEmail({
        name: newMessage.name,
        email: newMessage.email,
        message: newMessage.message,
        timestamp: newMessage.createdAt
      });
      console.log('Email sent successfully');
    } catch (emailError) {
      console.error('Email send failed:', emailError.message);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error.message);
    res.status(500).json({ message: 'Server error, could not save message' });
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error getting messages:', error.message);
    res.status(500).json({ message: 'Server error, could not retrieve messages' });
  }
};

// @desc    Delete a message by ID
// @route   DELETE /api/messages/:id
// @access  Private/Admin
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await message.deleteOne();
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error.message);
    res.status(500).json({ message: 'Server error, could not delete message' });
  }
};

module.exports = {
  createMessage,
  getMessages,
  deleteMessage
};
