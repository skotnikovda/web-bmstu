import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default UserSchema;
