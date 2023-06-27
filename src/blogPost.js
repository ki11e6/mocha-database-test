import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

export default BlogPost;
