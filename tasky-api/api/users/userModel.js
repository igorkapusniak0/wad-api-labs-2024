import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (password) {
        return passwordRegex.test(password);
      },
      message:
        'Password must be at least 8 characters long and contain at least one letter, one digit, and one special character.',
    },
  },
});

export default mongoose.model('User', UserSchema);
