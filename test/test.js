const assert = require('assert')
const { GetUsernameInCommand } = require('../dist/scripts/functions')

describe('a couple of tests of first functions', () => {
  describe('getting username in GetAge or GetBirthday commands', () => {
    it('should return nickname of user', () => {
      const test1 = '/getBirthday @ju_par'
      const test2 = '/getAge @dkaraush'

      assert.equal(GetUsernameInCommand(test1), '@ju_par')
      assert.equal(GetUsernameInCommand(test2), '@dkaraush')
    })
    it('should return name of user', () => {
      const test1 = '/getBirthday Julia'
      const test2 = '/getAge Julia'

      assert.equal(GetUsernameInCommand(test1), 'Julia')
      assert.equal(GetUsernameInCommand(test2), 'Julia')
    })
    it('should return first name and last name of user in array', () => {
      const test1 = '/getBirthday Julia Pirogova'
      const test2 = '/getAge Julia Pirogova'

      assert.equal(GetUsernameInCommand(test1).length, 2)
      assert.equal(GetUsernameInCommand(test2).length, 2)
    })
    it('should return an empty string', () => {
      const test1 = '/getBirthday'
      const test2 = '/getAge'

      assert.equal(GetUsernameInCommand(test1), '')
      assert.equal(GetUsernameInCommand(test2), '')
    })
    it('should return null', () => {
      const test1 = '/getBirthday 23jioc=23=-ox'
      const test2 = '/getAge 209=fw=4-'

      assert.equal(GetUsernameInCommand(test1), null)
      assert.equal(GetUsernameInCommand(test2), null)
    })
  })
})
