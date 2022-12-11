/* eslint-disable no-unused-vars */
import moment from 'moment'

import { IBirthdaysTypes } from '../common/interfaces/@types/IFunctions'
import usersInfoSheets from '../common/interfaces/@types/usersInfoSheets.d.ts/usersInfoSheets'
import { BirthdaysTypes } from './functions'

export function GetBirthdayPhrase (text: usersInfoSheets): string {
  const thisYear: string = moment().format('YYYY')
  const date = text.date.split('.').reverse()
  date.splice(0, 1, thisYear)
  date.join('')

  const birthdayTime: string = moment(date, 'YYYYMMDD').from(moment().add(1, 'day'))

  if (-1 !== birthdayTime.indexOf('ago')) {
    const phrase: string = `${text.first_name}'s birthday was ${birthdayTime}`
    return phrase
  }
  const phrase: string = `${text.first_name}'s birthday will be ${birthdayTime}`
  return phrase
}

export async function GetAgePhrase (text: number | string): Promise<void | string> {
  return ''
}

export async function BirthdaysLeftPhrase (birthdaysList: usersInfoSheets[], amount: number = birthdaysList.length, start: 'beginning' | 'end' = 'beginning'): Promise<string | void> {
  let result: string = 'In this year these users had birthdays (from recently to long time ago): \n'

  birthdaysList
    .sort(function (previousEl: usersInfoSheets, nextEl: usersInfoSheets) {
      const thisElBirthdayMonth: number = +previousEl.date.split('.')[1]
      const nextElBirthdayMonth: number = +nextEl.date.split('.')[1]
      return nextElBirthdayMonth - thisElBirthdayMonth
    })
    .forEach((el: usersInfoSheets, index: number) => {
      let phrase = `${index + 1}. ${el.first_name}`
      if (el.last_name) { phrase += ` ${el.last_name}` }
      result += `${phrase} \n`
    })

  console.log(result)

  return result
}

export async function BirthdaysWillBePhrase (birthdaysList: usersInfoSheets[], amount: number = birthdaysList.length, start: 'beginning' | 'end' = 'beginning'): Promise<string | void> {
  let result: string = 'In this year these users have had their birthdays already (from recently to long time) :\n'

  birthdaysList
    .sort(function (previousEl: usersInfoSheets, nextEl: usersInfoSheets) {
      const thisElBirthdayMonth: number = +previousEl.date.split('.')[1]
      const nextElBirthdayMonth: number = +nextEl.date.split('.')[1]
      return nextElBirthdayMonth - thisElBirthdayMonth
    })
    .forEach((el: usersInfoSheets, index: number) => {
      let phrase = `${index + 1}. ${el.first_name}`
      if (el.last_name) { phrase += ` ${el.last_name}` }
      result += `${phrase} \n`
    })

  console.log(result)

  return result
}

export async function BirthdaysListPhrase (birthdaysList: usersInfoSheets[], amount: number = birthdaysList.length, start: 'beginning' | 'end' = 'beginning'): Promise<string | void> {
  let result: string = 'List of all users\' birthdays: \n'

  birthdaysList.forEach((el: usersInfoSheets, index: number) => {
    let phrase = `${index + 1}. ${el.first_name}`
    if (el.last_name) { phrase += ` ${el.last_name}` }
    result += `${phrase} \n`
  })
}

const BIRTHDAYPAST = BirthdaysTypes().then((value: IBirthdaysTypes) => {
  console.log(BirthdaysLeftPhrase(value.past))
  console.log(BirthdaysWillBePhrase(value.future))
})
