"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/first */
require('dotenv').config({ path: './private/.env' });
const telegraf_1 = require("telegraf");
const translate_1 = require("./dictionary/translate");
const functions_1 = require("./scripts/functions");
const { TOKEN } = process.env;
const Bot = new telegraf_1.Telegraf(TOKEN);
const usersLang = [];
Bot.command(['help', 'about', 'start'], ctx => {
    var _a;
    const { username, first_name, last_name } = ctx.update.message.from;
    const name = (_a = username !== null && username !== void 0 ? username : first_name) !== null && _a !== void 0 ? _a : last_name;
    const userLang = (0, functions_1.CheckLanguage)(usersLang, name);
    const { text } = ctx.update.message;
    ctx.reply(translate_1.commands[text.slice(1)][userLang]);
});
Bot.command('chooseLanguage', ctx => {
    var _a;
    const { username, first_name, last_name } = ctx.update.message.from;
    const name = (_a = username !== null && username !== void 0 ? username : first_name) !== null && _a !== void 0 ? _a : last_name;
    const userLang = (0, functions_1.CheckLanguage)(usersLang, name);
    console.log(userLang);
    if (translate_1.commands.chooseLanguage) {
        console.log(translate_1.commands.chooseLanguage.phrase[userLang]);
        ctx.reply(translate_1.commands.chooseLanguage.phrase[userLang], translate_1.commands.chooseLanguage[userLang]);
    }
});
Bot.action(['English', 'Ukrainian'], ctx => {
    var _a;
    const { username, first_name, last_name } = ctx.update.callback_query.from;
    const name = (_a = username !== null && username !== void 0 ? username : first_name) !== null && _a !== void 0 ? _a : last_name;
    const { data } = ctx.update.callback_query;
    const resultCheck = (0, functions_1.CheckLangArr)(usersLang, name);
    const firstLang = (0, functions_1.CheckLanguage)(usersLang, name);
    if (typeof resultCheck === 'boolean') {
        const newUserLang = (0, functions_1.CreateUserLang)(ctx);
        usersLang.push(newUserLang);
        if (translate_1.commands.callBackQuery)
            ctx.reply(translate_1.commands.callBackQuery[firstLang][newUserLang.language]);
    }
    else {
        usersLang[resultCheck].language = data;
        if (translate_1.commands.callBackQuery)
            ctx.reply(translate_1.commands.callBackQuery[firstLang][data]);
    }
    console.log(usersLang);
});
Bot.hears('/getBirthday', ctx => {
    const { text } = ctx.update.message;
    console.log(text);
});
Bot.launch();
