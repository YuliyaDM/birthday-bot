"use strict";
/* eslint-disable camelcase */
// import { IUserLang } from '../common/interfaces/@types/langSettings/IUser'
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommand = void 0;
function CreateCommand(Bot, text, func) {
    Bot.action(text, (ctx) => func(ctx));
    Bot.command(text, (ctx) => func(ctx));
}
exports.CreateCommand = CreateCommand;
;
/*

function Start (ctx: any): void {
  const { name, username } = ctx.update.message.from
}

function Help (ctx: any): void {

}

function About (ctx: any): void {

}

*/
