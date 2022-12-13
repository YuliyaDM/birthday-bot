/* eslint-disable import/first */
require('dotenv').config({ path: './private/.env' })
import { Context, Telegraf } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'

import INewUserLang from './common/interfaces/@types/langSettings/INewUserLang.interface'
import IQueue from './common/interfaces/@types/IQueue'
import ICallBackQuery from './common/interfaces/@types/langSettings/CallBackQuery/ICallBackQuery.interface'
import ILangList from './common/interfaces/@types/langSettings/IList.interface'
import { commands } from './dictionary/translate'
import { CheckLangArr, CheckLanguage, CreateUserLang, FindNameInGetCommands } from './scripts/functions'

const { TOKEN } = process.env

const Bot: Telegraf<Context<Update>> = new Telegraf(TOKEN as string)

const USERSLANGS: INewUserLang[] = []

// eslint-disable-next-line prefer-const
let queue: IQueue[] = []

Bot.command(['help', 'about', 'start'], ctx => {
  const { username, first_name, last_name } = ctx.update.message.from
  const { text } = ctx.update.message
  const name: string = username ?? first_name ?? last_name
  const userLang: string = CheckLanguage(USERSLANGS, name)
  const message: string = commands[text.slice(1) as keyof object][userLang as keyof object] as string

  ctx.reply(message, {
    parse_mode: 'HTML'
  })
})

Bot.command('chooseLanguage', ctx => {
  const { username, first_name, last_name } = ctx.update.message.from
  const name: string = username ?? first_name ?? last_name
  const userLang: string = CheckLanguage(USERSLANGS, name)
  if (commands.chooseLanguage) {
    const message: string = commands.chooseLanguage.phrase[userLang as keyof object]
    const languages: ICallBackQuery = commands.chooseLanguage[userLang as keyof object]
    ctx.reply(message, languages)
  }
})

Bot.action(['English', 'Ukrainian'], ctx => {
  const { username, first_name, last_name } = ctx.update.callback_query.from
  const name: string = username ?? first_name ?? last_name
  const { data } = ctx.update.callback_query
  const resultCheck: (number | boolean) = CheckLangArr(USERSLANGS, name)
  const firstLang = CheckLanguage(USERSLANGS, name)

  if ('boolean' === typeof resultCheck) {
    const newUserLang: INewUserLang = CreateUserLang(ctx)
    USERSLANGS.push(newUserLang)
    if (commands.callBackQuery) {
      ctx.reply(commands.callBackQuery[firstLang][newUserLang.language])
    }
  }
  else {
    USERSLANGS[resultCheck as number].language = data as ILangList
    if (commands.callBackQuery) {
      ctx.reply(commands.callBackQuery[firstLang][data as keyof object], {
        parse_mode: 'HTML'
      })
    }
  }

  console.log(USERSLANGS)
})

Bot.hears(['/getBirthday', '/getAge'], ctx => {
  const matchCommand: RegExp = /\/get(Birthday|Age)/gm
  const { text } = ctx.update.message
  const { username, first_name, last_name } = ctx.update.message.from
  const typedCommand = text.match(matchCommand)![0]
  const usersData = FindNameInGetCommands(text)
  if ('' === usersData) {
    const userQueue: IQueue = { username, first_name, last_name, command: typedCommand }
    queue.push(userQueue)
    console.log(queue)
  }
  if (!usersData) {
    ctx.reply('')
  }
})

Bot.hears(['/whoHasThisAge'], ctx => {
  const matchCommand: RegExp = /\/whoHasThisAge/gm
  const { text } = ctx.update.message
  const { username, first_name, last_name } = ctx.update.message.from
  const typedCommand = text.match(matchCommand)![0]
  console.log(username, first_name, last_name, typedCommand)
})

Bot.launch()
