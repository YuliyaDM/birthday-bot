/* eslint-disable no-unused-vars */
import moment from 'moment'

import usersInfoSheets from '../common/interfaces/@types/usersInfoSheets/usersInfoSheets'

export function GetBirthdayPhrase (userInfo: usersInfoSheets): string {
  // how many months will be of left
  const thisYear: string = moment().format('YYYY')
  const usersMomentDate = userInfo.date.split('.').reverse()
  usersMomentDate.splice(0, 1, thisYear)
  usersMomentDate.join('')

  // how many days will be or left
  const milisecondsDay: number = 86400000
  const usersChangedDate: string = userInfo.date.split('.').reverse().join('-').replace(/\d{4}/gm, thisYear)
  const usersDate: string = `${usersChangedDate}T00:00:00.000Z`
  const currentDate: number = Date.parse(new Date().toString())
  const leftDays = Math.round((currentDate - Date.parse(usersDate)) / milisecondsDay)

  const birthdayTime: string = moment(usersMomentDate, 'YYYYMMDD').from(moment().add(1, 'day'))

  if (-1 !== birthdayTime.indexOf('ago')) {
    const phrase: string = `${userInfo.first_name}'s birthday was ${birthdayTime} (${leftDays} days left)`
    return phrase
  }
  const phrase: string = `${userInfo.first_name}'s birthday will be ${birthdayTime} (in ${leftDays} days)`
  return phrase
}

export function GetAgePhrase (userInfo: usersInfoSheets): number {
  const newDate: Date = new Date()
  const currentDate: number[] = [newDate.getFullYear(), newDate.getMonth(), newDate.getDay()]
  const usersBirthday: number[] = userInfo.date.split('.').reverse().map(el => +el)
  const usersAge: number = moment(currentDate).diff(usersBirthday, 'years')
  return usersAge
}

export function WhoHasThisAgePhrase (users: usersInfoSheets[]): string {
  let result: string = ''

  users.forEach((el: usersInfoSheets, index: number) => {
    let phrase: string = `${index}. ${el.first_name}`
    if (el.last_name) { phrase += ` ${el.last_name}` }
    result += '\n'
    result += phrase
  })

  return result
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
