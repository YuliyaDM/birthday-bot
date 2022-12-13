/* eslint-disable no-unused-vars */
import moment from 'moment'

import { IBirthdaysTypes, IFindNameInGetCommands, IGetCommands, IGetUsersInfo, IRequest } from '../common/interfaces/@types/commands/IFunctions.interface'
import { IRegexpsGetCommands } from '../common/interfaces/@types/IRegexp.interface'
import ILanguageArr from '../common/interfaces/@types/langSettings/IArr.interface'
import ILangList from '../common/interfaces/@types/langSettings/IList.interface'
import INewUserLang from '../common/interfaces/@types/langSettings/INewUserLang.interface'
import userInfoKeys from '../common/interfaces/@types/usersInfoSheets/userInfoKeys.interface'
import usersInfoSheets from '../common/interfaces/@types/usersInfoSheets/usersInfoSheets.interface'
import * as Regexp from '../constants/regexp'
import { GetAgePhrase } from '../scripts/phrases'

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

export async function WhoHasThisAge (age: number): Promise<usersInfoSheets[]> {
  const peers: Partial<usersInfoSheets[]> = []

  const users: usersInfoSheets[] = await GetUsersInfo()

  users.forEach((el: usersInfoSheets) => {
    const elAge: number = GetAgePhrase(el)
    if (elAge === age) { peers.push(el) }
  })

  return peers as usersInfoSheets[]
}

export function FindNameInGetCommands (text: string): IFindNameInGetCommands {
  const command: IGetCommands = text.match(Regexp.matchGetCommands.findCommands) as unknown as IGetCommands
  const regexps: IRegexpsGetCommands = Regexp[command]
  const { removeCommand, findError, findDigits } = regexps
  const matchName: string = text.replace(removeCommand, '')
  const isError: (null | RegExpMatchArray) = matchName.match(findError)
  if (!isError) {
    if (matchName.match(findDigits as RegExp)) {
      const age: string = matchName.match(findDigits as RegExp)![0]
      if (100 < +age) { return 'A very big age' }
    }
    return matchName ?? ''
  }
  return null
}

export async function GetBirthday (text: string): Promise<usersInfoSheets[]> {
  const sheetsOfUsers: usersInfoSheets[] = await GetUsersInfo()
  const usersBirthdays: Partial<usersInfoSheets>[] = []

  sheetsOfUsers.forEach((el: usersInfoSheets, index: number) => {
    Object.keys(el).forEach((key: string) => {
      const value: string = el[key as keyof usersInfoSheets]
      text.split(' ').forEach((userInfo: string) => {
        if (value === userInfo || `@${value}` === userInfo) { usersBirthdays.push(el) }
      })
    })
  })

  console.log(usersBirthdays)

  return usersBirthdays as usersInfoSheets[]
}

export async function BirthdaysTypes (): Promise<IBirthdaysTypes> {
  const sheetsOfUsersInfo: usersInfoSheets[] = await GetUsersInfo()
  const birthdaysInFuture: Partial<usersInfoSheets[]> = []
  const birthdaysInPast: Partial<usersInfoSheets[]> = []

  sheetsOfUsersInfo.forEach((el: usersInfoSheets) => {
    const thisYear: string = moment().format('YYYY')
    let usersDate: any = el.date.split('.').reverse()
    usersDate.splice(0, 1, thisYear)
    usersDate = usersDate.join('')

    const birthdayWillBe: boolean = !(moment(usersDate, 'YYYYMMDD').fromNow().indexOf('in'))

    if (birthdayWillBe) { birthdaysInFuture.push(el) }
    else { birthdaysInPast.push(el) }
  })

  const result: IBirthdaysTypes = {
    future: birthdaysInFuture as usersInfoSheets[],
    past: birthdaysInPast as usersInfoSheets[],
    all: sheetsOfUsersInfo
  }

  return result
}

export function GetListOfBirthdays (usersSheetsArr: usersInfoSheets[], amount: number = usersSheetsArr.length, start: ('beginning' | 'end') = 'beginning'): usersInfoSheets[] {
  if ('end' === start) {
    usersSheetsArr.reverse()
  }
  return usersSheetsArr.slice(0, amount)
}

export async function GetUsersInfo (): IGetUsersInfo {
  try {
    const request: Readonly<IRequest> = {
      spreadsheetId: process.env.SPREADSHEET_ID as string,
      range: ['A1:ZZ'],
      auth: process.env.GOOGLE_SPREADSHEET_API_KEY as string
    }

    const response: Readonly<Array<string[]>> = (await sheets.spreadsheets.values.get(request)).data.values
    const usersInfoDescription: Readonly<string[]> = ['first_name', 'last_name', 'date', 'username']
    const usersInfoObj: Partial<usersInfoSheets>[] = []
    response.slice(1).forEach((el: string[]) => {
      const usersInfo: Partial<usersInfoSheets> = {}

      el.slice(0, -1).forEach((_, index: number) => {
        const userInfoDescription: userInfoKeys = usersInfoDescription[index] as userInfoKeys
        usersInfo[userInfoDescription] = el[index]
      })

      usersInfoObj.push(usersInfo as usersInfoSheets)
    })

    const sortUsers = usersInfoObj as usersInfoSheets[]

    sortUsers.sort((previousEl: usersInfoSheets, nextEl: usersInfoSheets) => {
      const previousDate: string = previousEl.date.split('.')[2]
      const nextDate: string = nextEl.date.split('.')[2]

      return +nextDate - +previousDate
    })

    return sortUsers
  }
  catch (error: unknown) {
    console.log(error)
  }
}
