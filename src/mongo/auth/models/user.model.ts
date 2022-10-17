import UserSchema from 'mongo/auth/schemas/user.schema';
import mongoose from 'mongoose';

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
