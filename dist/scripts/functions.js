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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersInfo = exports.FindNameInGetCommands = exports.CheckLangArr = exports.CreateUserLang = exports.CheckLanguage = void 0;
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
function GetUsersInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const request = {
                spreadsheetId: process.env.SPREADSHEET_ID,
                range: ['A1:J14'],
                auth: process.env.GOOGLE_SPREADSHEET_API_KEY
            };
            const response = (yield sheets.spreadsheets.values.get(request));
            console.log(JSON.stringify(response, null, 2));
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.GetUsersInfo = GetUsersInfo;
GetUsersInfo();
