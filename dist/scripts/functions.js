"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersInfo = exports.GetListOfBirthdays = exports.BirthdaysTypes = exports.GetBirthday = exports.FindNameInGetCommands = exports.CheckLangArr = exports.CreateUserLang = exports.CheckLanguage = void 0;
const moment_1 = __importDefault(require("moment"));
const Regexp = __importStar(require("../constants/regexp"));
const { google } = require('googleapis');
const sheets = google.sheets('v4');
require('dotenv').config({ path: './private/.env' });
function CheckLanguage(usersLang, name) {
    for (let i = 0, userLangLength = usersLang.length; i < userLangLength; i++) {
        const el = usersLang[i];
        const keys = Object.values(el);
        for (let s = 0, keysL = keys.length; s < keysL; s++) {
            const key = keys[s];
            if (key === name) {
                return el.language;
            }
        }
    }
    ;
    return 'English';
}
exports.CheckLanguage = CheckLanguage;
;
function CreateUserLang(ctx) {
    const { data } = ctx.update.callback_query;
    const { username, first_name, last_name } = ctx.update.callback_query.from;
    const newUser = { username, first_name, last_name, language: data };
    return newUser;
}
exports.CreateUserLang = CreateUserLang;
function CheckLangArr(usersLang, name) {
    for (let i = 0, userLangLength = usersLang.length; i < userLangLength; i++) {
        const el = usersLang[i];
        const keys = Object.values(el);
        for (let s = 0, keysL = keys.length; s < keysL; s++) {
            const key = keys[s];
            if (key === name) {
                return i;
            }
        }
    }
    return false;
}
exports.CheckLangArr = CheckLangArr;
function FindNameInGetCommands(text) {
    const command = text.match(Regexp.matchGetCommands.findCommands);
    const regexps = Regexp[command];
    const { removeCommand, findError, findSpace, findDigits } = regexps;
    const matchName = text.replace(removeCommand, '');
    const isError = matchName.match(findError);
    if (!isError) {
        if (matchName.length) {
            if (findDigits) {
                const age = matchName.match(findDigits)[0];
                if (100 < +age) {
                    return 'A very big age';
                }
            }
            if (matchName.match(findSpace)) {
                return matchName.split(' ');
            }
            return matchName;
        }
        return '';
    }
    return null;
}
exports.FindNameInGetCommands = FindNameInGetCommands;
async function GetBirthday(text) {
    const sheetsOfUsers = await GetUsersInfo();
    const usersBirthdays = [];
    sheetsOfUsers.forEach((el) => {
        Object.keys(el).forEach((key) => {
            const value = el[key];
            if (value === text || `@${value}` === text) {
                usersBirthdays.push(el);
            }
        });
    });
    return usersBirthdays;
}
exports.GetBirthday = GetBirthday;
async function BirthdaysTypes() {
    const sheetsOfUsersInfo = await GetUsersInfo();
    const birthdaysInFuture = [];
    const birthdaysInPast = [];
    sheetsOfUsersInfo.forEach((el) => {
        const thisYear = (0, moment_1.default)().format('YYYY');
        let usersDate = el.date.split('.').reverse();
        usersDate.splice(0, 1, thisYear);
        usersDate = usersDate.join('');
        const birthdayWillBe = !((0, moment_1.default)(usersDate, 'YYYYMMDD').fromNow().indexOf('in'));
        if (birthdayWillBe) {
            birthdaysInFuture.push(el);
        }
        else {
            birthdaysInPast.push(el);
        }
    });
    const result = {
        future: birthdaysInFuture,
        past: birthdaysInPast,
        all: sheetsOfUsersInfo
    };
    return result;
}
exports.BirthdaysTypes = BirthdaysTypes;
function GetListOfBirthdays(usersSheetsArr, amount = usersSheetsArr.length, start = 'beginning') {
    if ('end' === start) {
        usersSheetsArr.reverse();
    }
    return usersSheetsArr.slice(0, amount);
}
exports.GetListOfBirthdays = GetListOfBirthdays;
async function GetUsersInfo() {
    try {
        const request = {
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: ['A1:ZZ'],
            auth: process.env.GOOGLE_SPREADSHEET_API_KEY
        };
        const response = (await sheets.spreadsheets.values.get(request)).data.values;
        const usersInfoDescription = ['first_name', 'last_name', 'date', 'username'];
        const usersInfoObj = [];
        response.slice(1).forEach((el) => {
            const usersInfo = {};
            el.slice(0, -1).forEach((_, index) => {
                const userInfoDescription = usersInfoDescription[index];
                usersInfo[userInfoDescription] = el[index];
            });
            usersInfoObj.push(usersInfo);
        });
        return usersInfoObj;
    }
    catch (error) {
        console.log(error);
    }
}
exports.GetUsersInfo = GetUsersInfo;
