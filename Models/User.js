import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
      required: function () {
        return !this.provider;
      }
    },
    provider: { type: String },
    firebaseUid: { type: String },
    profilePic: { type: String }

  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
