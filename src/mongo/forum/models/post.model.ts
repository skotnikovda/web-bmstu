import PostSchema from 'mongo/forum/schemas/post.schema';
import mongoose from 'mongoose';

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
