import assert from 'assert';
import User from '../src/user.js';

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    // console.log(validationResult.errors.name.message);
    // console.log(message);
    assert(message === 'Name is required.');
  });

  it("requires a user's name longer than 2 characters", () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    // console.log(validationResult);
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters');
  });

  it('disballows invalid records fom being saved', (done) => {
    const user = new User({ name: 'al' });
    user.save().catch((validationResult) => {
      const { message } = validationResult.errors.name;
      assert(message === 'Name must be longer than 2 characters');
      done();
    });
  });
});
