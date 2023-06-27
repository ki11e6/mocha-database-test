import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const CommentSchema = new Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Comment = mongoose.model('comment', CommentSchema);
export default Comment;
