/* eslint-disable camelcase */
import INewUserLang from '../common/interfaces/@types/INewUserLang'
import IRegexps from '../common/interfaces/@types/IRegexp'
import ILanguageArr from '../common/interfaces/@types/langSettings/IArr'
import ILangList from '../common/interfaces/@types/langSettings/IList'

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
  const regexps: IRegexps = {
    removeCommand: /^.*\/get(Age|Birthday)( ){0,}|( ){1,}$/mg,
    findError: /[^A-z0-9_@ ]/gm
  }
  const { removeCommand, findError } = regexps
  const matchName: string = text.replace(removeCommand, '')
  const isError: boolean = !!(matchName.match(findError) as RegExpMatchArray)
  if (!matchName.length) return ''
  if (!isError) return matchName

  return null
}
