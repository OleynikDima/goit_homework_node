const mongoose = require('mongoose');
const { Schema } = mongoose;

const authSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatarURL: { type: String, required: true },
  status: {
    type: String,
    requred: true,
    enum: ['created', 'verified'],
    default: 'created',
  },
  verificationToken: { type: String, default: '', required: false },
  subscription: {
    type: String,
    enum: ['free', 'pro', 'premium'],
    default: 'free',
    required: true,
  },
  token: { type: String, required: false },
});

const authModel = mongoose.model('Auth', authSchema);

module.exports = authModel;
