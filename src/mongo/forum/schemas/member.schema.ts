import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  birthday: { type: Date, required: true },
});

export default MemberSchema;
