const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name:{
    type: String,
    required: [true, 'Name is required.']
  },
  postCount: Number,
  posts: [PostSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;

==========48