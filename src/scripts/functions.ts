import { IFindNameInGetCommands, IGetCommands, IGetUsersInfo, IRequest } from '../common/interfaces/@types/IFunctions'
import INewUserLang from '../common/interfaces/@types/INewUserLang'
import { IRegexpsGetCommands } from '../common/interfaces/@types/IRegexp'
import ILanguageArr from '../common/interfaces/@types/langSettings/IArr'
import ILangList from '../common/interfaces/@types/langSettings/IList'
import * as Regexp from '../constants/regexp'

const { google } = require('googleapis')
const sheets = google.sheets('v4')

require('dotenv').config({ path: './private/.env' })

export function CheckLanguage (usersLang: ILanguageArr, name: string): ILangList {
  for (let i: number = 0, userLangLength: number = usersLang.length; i < userLangLength; i++) {
    const el = usersLang[i]
    const keys = Object.values(el)
    for (let s: number = 0, keysL: number = keys.length; s < keysL; s++) {
      const key = keys[s]
      if (key === name) {
        return el.language
      }
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
      if (key === name) {
        return i
      }
    }
  }
  return false
}

export function FindNameInGetCommands (text: string): IFindNameInGetCommands {
  const command: IGetCommands = text.match(Regexp.matchGetCommands.findCommands) as unknown as IGetCommands
  const regexps: IRegexpsGetCommands = Regexp[command]
  const { removeCommand, findError, findSpace, findDigits } = regexps
  const matchName: string = text.replace(removeCommand, '')
  const isError: (null | RegExpMatchArray) = matchName.match(findError)
  if (!isError) {
    if (matchName.length) {
      if (findDigits) {
        const age: string = matchName.match(findDigits)![0]
        if (100 < +age) { return 'A very big age' }
      }
      if (matchName.match(findSpace)) {
        return matchName.split(' ')
      }
      return matchName
    }
    return ''
  }
  return null
}

export async function GetUsersInfo (): IGetUsersInfo {
  try {
    const request: IRequest = {
      spreadsheetId: process.env.SPREADSHEET_ID as string,
      range: ['A1:J14'],
      auth: process.env.GOOGLE_SPREADSHEET_API_KEY as string
    }

    const response: string = (await sheets.spreadsheets.values.get(request))
    console.log(JSON.stringify(response, null, 2))
  }
  catch (error: unknown) {
    console.log(error)
  }
}

GetUsersInfo()
