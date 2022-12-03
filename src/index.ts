/* eslint-disable import/first */
/* eslint-disable camelcase */
require('dotenv').config({ path: require('find-config')('.env') })
import { Telegraf } from 'telegraf'
import { INewUserLang } from './common/interfaces/@types/INewUserLang'
import { ILangList } from './common/interfaces/@types/langSettings/IList'
import { commands } from './dictionary/text'
import { CheckLangArr, CheckLanguage, CreateUserLang } from './scripts/functions'

console.log(process.env.TOKEN)

const TOKEN: string = '5702448393:AAE3OW-Fun-z2Vv79SGIRFlTXgxLiqUOaQc'

const Bot = new Telegraf(TOKEN as string)

const usersLang: INewUserLang[] = []

Bot.command(['help', 'about', 'start'], ctx => {
  const { username, first_name, last_name } = ctx.update.message.from
  const name: string = username ?? first_name ?? last_name
  const userLang: string = CheckLanguage(usersLang, name)
  const { text } = ctx.update.message

  ctx.reply(commands[text.slice(1) as keyof object][userLang as keyof object] as string)
})

Bot.command('chooseLanguage', ctx => {
  const { username, first_name, last_name } = ctx.update.message.from
  const name: string = username ?? first_name ?? last_name
  const userLang: string = CheckLanguage(usersLang, name)

  console.log(userLang)

  if (commands.chooseLanguage) {
    console.log(commands.chooseLanguage.phrase[userLang as keyof object])
    ctx.reply(commands.chooseLanguage.phrase[userLang as keyof object], commands.chooseLanguage[userLang as keyof object])
  }
})

Bot.action(['English', 'Ukrainian'], ctx => {
  const { username, first_name, last_name } = ctx.update.callback_query.from
  const name: string = username ?? first_name ?? last_name
  const { data } = ctx.update.callback_query
  const resultCheck: (number | boolean) = CheckLangArr(usersLang, name)
  const firstLang = CheckLanguage(usersLang, name)

  if (typeof resultCheck === 'boolean') {
    const newUserLang: INewUserLang = CreateUserLang(ctx)
    usersLang.push(newUserLang)
    if (commands.callBackQuery) ctx.reply(commands.callBackQuery[firstLang][newUserLang.language])
  } else {
    usersLang[resultCheck as number].language = data as ILangList
    if (commands.callBackQuery) ctx.reply(commands.callBackQuery[firstLang][data as keyof object])
  }

  console.log(usersLang)
})

Bot.hears('/getBirthday', ctx => {
  const { text } = ctx.update.message

  console.log(text)
})

Bot.launch()
