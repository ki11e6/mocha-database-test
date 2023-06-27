import mongoose from 'mongoose';
import assert from 'assert';
import User from '../src/user.js';
import BlogPost from '../src/blogPost.js';

describe('Middleware', () => {
  let joe, blogPost;
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS is Great',
      content: 'Yep its really great',
    });
    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it('users clean up dangling blogposts on remove', (done) => {
    joe
      .deleteOne()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        // console.log(count);
        done();
      });
  });
});
