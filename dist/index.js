"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/first */
require('dotenv').config({ path: './private/.env' });
const telegraf_1 = require("telegraf");
const translate_1 = require("./dictionary/translate");
const functions_1 = require("./scripts/functions");
const { TOKEN } = process.env;
const Bot = new telegraf_1.Telegraf(TOKEN);
const USERSLANGS = [];
// eslint-disable-next-line prefer-const
let queue = [];
Bot.command(['help', 'about', 'start'], ctx => {
    var _a;
    const { username, first_name, last_name } = ctx.update.message.from;
    const { text } = ctx.update.message;
    const name = (_a = username !== null && username !== void 0 ? username : first_name) !== null && _a !== void 0 ? _a : last_name;
    const userLang = (0, functions_1.CheckLanguage)(USERSLANGS, name);
    const message = translate_1.commands[text.slice(1)][userLang];
    ctx.reply(message, {
        parse_mode: 'HTML'
    });
});
Bot.command('chooseLanguage', ctx => {
    var _a;
    const { username, first_name, last_name } = ctx.update.message.from;
    const name = (_a = username !== null && username !== void 0 ? username : first_name) !== null && _a !== void 0 ? _a : last_name;
    const userLang = (0, functions_1.CheckLanguage)(USERSLANGS, name);
    if (translate_1.commands.chooseLanguage) {
        const message = translate_1.commands.chooseLanguage.phrase[userLang];
        const languages = translate_1.commands.chooseLanguage[userLang];
        ctx.reply(message, languages);
    }
});
Bot.action(['English', 'Ukrainian'], ctx => {
    var _a;
    const { username, first_name, last_name } = ctx.update.callback_query.from;
    const name = (_a = username !== null && username !== void 0 ? username : first_name) !== null && _a !== void 0 ? _a : last_name;
    const { data } = ctx.update.callback_query;
    const resultCheck = (0, functions_1.CheckLangArr)(USERSLANGS, name);
    const firstLang = (0, functions_1.CheckLanguage)(USERSLANGS, name);
    if ('boolean' === typeof resultCheck) {
        const newUserLang = (0, functions_1.CreateUserLang)(ctx);
        USERSLANGS.push(newUserLang);
        if (translate_1.commands.callBackQuery) {
            ctx.reply(translate_1.commands.callBackQuery[firstLang][newUserLang.language]);
        }
    }
    else {
        USERSLANGS[resultCheck].language = data;
        if (translate_1.commands.callBackQuery) {
            ctx.reply(translate_1.commands.callBackQuery[firstLang][data], {
                parse_mode: 'HTML'
            });
        }
    }
    console.log(USERSLANGS);
});
Bot.hears(['/getBirthday', '/getAge'], ctx => {
    const matchCommand = /\/get(Birthday|Age)/gm;
    const { text } = ctx.update.message;
    const { username, first_name, last_name } = ctx.update.message.from;
    const typedCommand = text.match(matchCommand)[0];
    const usersData = (0, functions_1.FindNameInGetCommands)(text);
    if ('' === usersData) {
        const userQueue = { username, first_name, last_name, command: typedCommand };
        queue.push(userQueue);
        console.log(queue);
    }
    if (!usersData) {
        ctx.reply('');
    }
});
Bot.hears(['/whoHasThisAge'], ctx => {
    const matchCommand = /\/whoHasThisAge/gm;
    const { text } = ctx.update.message;
    const { username, first_name, last_name } = ctx.update.message.from;
    const typedCommand = text.match(matchCommand)[0];
    console.log(username, first_name, last_name, typedCommand);
});
Bot.launch();
