/* eslint-disable camelcase */
import { ILangList } from '../common/interfaces/@types/langSettings/IList'
import { ILanguageArr } from '../common/interfaces/@types/langSettings/IArr'
import { INewUserLang } from '../common/interfaces/@types/INewUserLang'

export function CheckLanguage (usersLang: ILanguageArr, name: string): ILangList {
  for (let i: number = 0, userLangLength: number = usersLang.length; i < userLangLength; i++) {
    const el = usersLang[i]
    const keys = Object.values(el)
    for (let s: number = 0, keysL: number = keys.length; s < keysL; s++) {
      const key = keys[s]
      if (key === name) return el.language
    }
  };
  return 'English'
};

export function CreateUserLang (ctx: any): INewUserLang {
  const { data } = ctx.update.callback_query
  const { username, first_name, last_name } = ctx.update.callback_query.from
  const newUser: INewUserLang = { username, first_name, last_name, language: data }

  return newUser
}

export function CheckLangArr (usersLang: ILanguageArr, name: string): (number | boolean) {
  for (let i: number = 0, userLangLength = usersLang.length; i < userLangLength; i++) {
    const el = usersLang[i]
    const keys = Object.values(el)
    for (let s: number = 0, keysL = keys.length; s < keysL; s++) {
      const key = keys[s]
      if (key === name) return i
    }
  }
  return false
}

export function CheckBirthdayUser (text: string): (string | null) {
  const regexpCheckString = /\/getBirthday(( [@A-z0-9]{1,}){2})|( [@A-z0-9]{1,})/gm
  const correctString: boolean = regexpCheckString.test(text)
  console.log(text.match(regexpCheckString))
  if (correctString || text === '/getBirthday') {
    const result: string = text.replace(/\/getBirthday/gm, '').replace(/( $|^ )/gm, '')
    return result
  }
  return 'I cannot understand this command.'
}

const TEST1 = '/getBirthday @quartz555' // nickname
const TEST2 = '/getBirthday Bogdan'
const TEST3 = '/getBirthday Grishin'
const TEST4 = '/getBirthday Bogdan Grishin'
const TEST5 = '/getBirthday'
const TEST6 = '/getBirthday 23jioc=23=-ox'

console.log(CheckBirthdayUser(TEST1))
console.log(CheckBirthdayUser(TEST2))
console.log(CheckBirthdayUser(TEST3))
console.log(CheckBirthdayUser(TEST4))
console.log(CheckBirthdayUser(TEST5))
console.log(CheckBirthdayUser(TEST6))
