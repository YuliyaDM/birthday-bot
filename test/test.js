const assert = require('assert')
const { FindNameInGetCommands, GetBirthday } = require('../dist/scripts/functions')

describe('a couple of tests of first functions', () => {
  describe('/whoHasThisAge', () => {
    it('should return age', () => {
      const test1 = '/whoHasThisAge 16'
      const test2 = '/whoHasThisAge 24'
      const test3 = '/whoHasThisAge 32'

      assert.equal(FindNameInGetCommands(test1), '16')
      assert.equal(FindNameInGetCommands(test2), '24')
      assert.equal(FindNameInGetCommands(test3), '32')
    })
    it('should return null', () => {
      const test1 = '/whoHasThisAge @$l23'
      const test2 = '/whoHasThisAge sjkss'
      const test3 = '/whoHasThisAge -='

      assert.equal(FindNameInGetCommands(test1), null)
      assert.equal(FindNameInGetCommands(test2), null)
      assert.equal(FindNameInGetCommands(test3), null)
    })
    it('should return invalid age', () => {
      const test1 = '/whoHasThisAge 123'

      assert.equal(FindNameInGetCommands(test1), 'A very big age')
    })
    it('should return an empty string', () => {
      const test1 = '/whoHasThisAge'

      assert.equal(FindNameInGetCommands(test1), '')
    })
    it('should return birthdays', () => {
      const test1 = GetBirthday('@Lijua').then(value => {
        const value0 = {
          first_name: 'Lijua',
          last_name: '',
          date: '03.06.2009',
          username: '@ju_par'
        }
        assert.equal(value[0], result)
      })

      const test2 = GetBirthday('Владимир').then(value => {
        const result0 = {
          first_name: 'Владимир',
          last_name: 'Панкратьев',
          date: '11.01.2008',
          username: '@vl_pnk'
        }
        const result1 = {
          first_name: 'Владимир',
          last_name: 'Шевченко',
          date: '12.01.2005',
          username: '@vshevchenko'
        }
        assert.equal(value[0], result0)
        assert.equal(value[1], result1)
      })
    })
  })
  describe('/getAge', () => {
    it('should return nickname of user', () => {
      const test2 = '/getAge @dkaraush'

      assert.equal(FindNameInGetCommands(test2), '@dkaraush')
    })
    it('should return name of user', () => {
      const test2 = '/getAge Julia'

      assert.equal(FindNameInGetCommands(test2), 'Julia')
    })
    it('should return first name and last name of user in array', () => {
      const test2 = '/getAge Julia Pirogova'

      assert.equal(FindNameInGetCommands(test2), 'Julia Pirogova')
    })
    it('should return null', () => {
      const test1 = '/getAge 209=fw=4-'

      assert.equal(FindNameInGetCommands(test1), null)
    })
    it('should return an empty string', () => {
      const test1 = '/getAge'

      assert.equal(FindNameInGetCommands(test1), '')
    })
  })
  describe('/getBirthday', () => {
    it('should return null', () => {
      const test1 = '/getBirthday 23jioc=23=-ox'
      assert.equal(FindNameInGetCommands(test1), null)
    })
    it('should return name of user', () => {
      const test1 = '/getBirthday Julia'

      assert.equal(FindNameInGetCommands(test1), 'Julia')
    })
    it('should return first name and last name of user in array', () => {
      const test1 = '/getBirthday Julia Pirogova'

      assert.equal(FindNameInGetCommands(test1), 'Julia Pirogova')
    })
    it('should return first name and username', () => {
      const test1 = '/getBirthday Lijua @ju_par'

      assert.equal(FindNameInGetCommands(test1), 'Lijua @ju_par')
    })
    it('should return an empty string', () => {
      const test1 = '/getBirthday'

      assert.equal(FindNameInGetCommands(test1), '')
    })
    it('should return nickname of user', () => {
      const test1 = '/getBirthday @ju_par'

      assert.equal(FindNameInGetCommands(test1), '@ju_par')
    })
  })
})
