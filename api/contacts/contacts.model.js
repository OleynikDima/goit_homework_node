const mongoose = require('mongoose');
const { Schema } = mongoose;

const contacSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  subscription: {
    type: String,
    enum: ['free', 'pro', 'premium'],
    default: 'free',
  },
  token: { type: String, required: true },
});

contacSchema.static.findUserByIdUpdate = findUserByIdUpdate;

async function findUserByIdUpdate(userId, updateParams) {
  return this.findByIdAndUpdate(
    userId,
    {
      $set: updateParams,
    },
    {
      new: true,
    },
  );
}

const userModel = mongoose.model('Contact', contacSchema);

module.exports = userModel;
