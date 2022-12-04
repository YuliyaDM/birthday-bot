const assert = require('assert')
const { CheckBirthdayUser } = require('../dist/scripts/functions')

describe('a couple of tests of first functions', () => {
  describe('first command ()', () => {
    it('should return nickname of user', () => {
      const test1 = '/getBirthday @ju_par'
      assert.equal(CheckBirthdayUser(test1), '@ju_par')
    })
    it('should return nickname of user', () => {
      const test2 = '/getBirthday Julia'
      assert.equal(CheckBirthdayUser(test2), 'Julia')
    })
    it('should return nickname of user', () => {
      const test3 = '/getBirthday @crzdvl'
      assert.equal(CheckBirthdayUser(test3), '@crzdvl')
    })
    it('should return nickname of user', () => {
      const test4 = '/getBirthday Julia Pirogova'
      assert.equal(CheckBirthdayUser(test4), 'Julia Pirogova')
    })
    it('should return nickname of user', () => {
      const test5 = '/getBirthday'
      assert.equal(CheckBirthdayUser(test5), '')
    })
    it('should return null', () => {
      const test6 = '/getBirthday 23jioc=23=-ox'
      assert.equal(CheckBirthdayUser(test6), null)
    })
  })
})
