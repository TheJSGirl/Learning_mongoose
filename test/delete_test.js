const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});

    joe.save()
    .then(() => {
      done();
    })
  });

  it('model instance remove', (done) => {
    joe.remove()
      .then(() => {
        User.findOne({name: 'Joe'});
      })
        .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', (done) => {
    User.remove({name: 'Joe'})
    .then(() => {
      User.findOne({name: 'Joe'});
    })
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findAndRemove', (done) => {
    User.findOneAndRemove({name: 'Joe'})
    .then(()=> {
      User.findOne({name: 'Joe'})
    })
      .then(() => {
        assert(user === null);
        done();
      })
  });

  it('class method findByIdRemove', (done) => {
    User.findByIdAndRemove(joe._id)
    .then(()=> {
      User.findOne({name: 'Joe'})
    })
      .then(() => {
        assert(user === null);
        done();
      })
  })

  it('Can remove an existing subdocuments', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'New Title'}]
    })
    joe.save()
    .then(() => {
      User.findOne({name: 'Joe'});
    })
    .then((user) => {
      const post = user.post[0];
      post.remove();
      return user.save();
    })
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      assert(user.posts.length === 0);
      done();
    })
  })
})