import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import PostSchema from './post.js';

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters',
    },
    required: [true, 'Name is required.'],
  },
  likes: Number,
  posts: [PostSchema],
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blogPost',
    },
  ],
});

UserSchema.virtual('postCount').get(function () {
  return this.posts.length;
});

const User = mongoose.model('user', UserSchema);

export default User;
