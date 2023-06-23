import assert from 'assert';
import User from '../src/user.js';

describe('Creating records', () => {
  it('saves a user', (done) => {
    const joe = new User({ name: 'Joe' });
    joe.save().then(() => {
      // when joe is not create then joe.isNew=true
      //so after created joe.isNew will return false
      assert(!joe.isNew);
      done();
    });
  });
});
