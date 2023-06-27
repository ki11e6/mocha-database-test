import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://127.0.0.1:27017/test');
  mongoose.connection
    .once('open', () => done())
    .on('error', (error) => console.warn('connection error', error));
});

beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        //done callback
        done();
      });
    });
  });
});
