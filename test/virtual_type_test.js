import assert from 'assert';
import User from '../src/user.js';

describe('Vertual types', (done) => {
  it('postCount returns number of posts', () => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }],
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(joe.postCount === 1);
        // console.log(user);
        done();
      });
  });
});
