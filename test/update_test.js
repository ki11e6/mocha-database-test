import assert from 'assert';
import User from '../src/user.js';

describe('Updating record', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('instance type using set n save', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('A model instance can update', (done) => {
    assertName(joe.updateOne({ name: 'Alex' }), done);
  });

  it('A model class can update', (done) => {
    assertName(User.updateMany({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('A model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('A model class can find one record with id and update', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
  });

  // x can be used to temp pause the test
  it('A user can have thier likes increment by 1', (done) => {
    User.updateMany({ name: 'Joe' }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.likes === 10);
        done();
      });
  });
});
