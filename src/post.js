import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
});

export default PostSchema;
