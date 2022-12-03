/* eslint-disable camelcase */
// import { IUserLang } from '../common/interfaces/@types/langSettings/IUser'

export function CreateCommand (Bot: any, text: string, func: Function): void {
  Bot.action(text, (ctx: any) => func(ctx))
  Bot.command(text, (ctx: any) => func(ctx))
};

/*

function Start (ctx: any): void {
  const { name, username } = ctx.update.message.from
}

function Help (ctx: any): void {

}

function About (ctx: any): void {

}

*/
