const assert = require('assert')
const { CheckBirthdayUser } = require('../dist/scripts/functions')

describe('a couple of tests of first functions', () => {
  describe('first command ()', () => {
    it('should return nickname of user', () => {
      const test1 = '/getBirthday @ju_par'
      const test3 = '/getAge @dkaraush'
      const test2 = '/getBirthday @crzdvl'

      assert.equal(CheckBirthdayUser(test1), '@ju_par')
      assert.equal(CheckBirthdayUser(test2), '@crzdvl')
      assert.equal(CheckBirthdayUser(test3), '@dkaraush')
    })
    it('should return name of user', () => {
      const test1 = '/getBirthday Julia'
      const test2 = '/getAge Julia'

      assert.equal(CheckBirthdayUser(test1), 'Julia')
      assert.equal(CheckBirthdayUser(test2), 'Julia')
    })
    it('should return first name and last name of user', () => {
      const test1 = '/getBirthday Julia Pirogova'
      const test2 = '/getAge Julia Pirogova'

      assert.equal(CheckBirthdayUser(test1), 'Julia Pirogova')
      assert.equal(CheckBirthdayUser(test2), 'Julia Pirogova')
    })
    it('should return an empty string', () => {
      const test1 = '/getBirthday'
      const test2 = '/getAge'

      assert.equal(CheckBirthdayUser(test1), '')
      assert.equal(CheckBirthdayUser(test2), '')
    })
    it('should return null', () => {
      const test1 = '/getBirthday 23jioc=23=-ox'
      const test2 = '/getAge 209=fw=4-'

      assert.equal(CheckBirthdayUser(test1), null)
      assert.equal(CheckBirthdayUser(test2), null)
    })
  })
})
