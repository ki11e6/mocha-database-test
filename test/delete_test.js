import assert from 'assert';
import User from '../src/user.js';

describe('Deleting a user', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  it('model instance remove', (done) => {
    joe
      .deleteOne()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  it('class method remove', () => {});
  it('class method findandRemove', () => {});
  it('class method findByIsandRemove', () => {});
});
