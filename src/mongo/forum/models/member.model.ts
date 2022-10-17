import MemberSchema from 'mongo/forum/schemas/member.schema';
import mongoose from 'mongoose';

const MemberModel = mongoose.model('Member', MemberSchema);

export default MemberModel;
