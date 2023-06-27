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

//adding virtual type to the model which will not be stored in mongodb
//this basically create a function to count the number of posts
UserSchema.virtual('postCount').get(function () {
  return this.posts.length;
});

//creating a middlware
//when user is deleted all associated posts will be deleted
UserSchema.pre('deleteOne', { document: true }, function (next) {
  const BlogPost = mongoose.model('blogPost');
  // this === joe
  BlogPost.deleteMany({ _id: { $in: this.blogPosts } }).then(() => next());
});

const User = mongoose.model('user', UserSchema);

export default User;
