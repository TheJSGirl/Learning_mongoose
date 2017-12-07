const assert = require('assert');
const User = require('../src/user');

describe('Validation records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    user.validationResult= user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required.');

  })
})