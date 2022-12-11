"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirthdaysWillBePhrase = exports.BirthdaysLeftPhrase = exports.GetBirthdayPhrase = void 0;
/* eslint-disable no-unused-vars */
const moment_1 = __importDefault(require("moment"));
const functions_1 = require("./functions");
function GetBirthdayPhrase(text) {
    const thisYear = (0, moment_1.default)().format('YYYY');
    const date = text.date.split('.').reverse();
    date.splice(0, 1, thisYear);
    date.join('');
    const birthdayTime = (0, moment_1.default)(date, 'YYYYMMDD').from((0, moment_1.default)().add(1, 'day'));
    if (-1 !== birthdayTime.indexOf('ago')) {
        const phrase = `${text.first_name}'s birthday was ${birthdayTime}`;
        return phrase;
    }
    const phrase = `${text.first_name}'s birthday will be ${birthdayTime}`;
    return phrase;
}
exports.GetBirthdayPhrase = GetBirthdayPhrase;
async function BirthdaysLeftPhrase(birthdaysList, amount = birthdaysList.length, start = 'beginning') {
    let result = 'In this year these users had birthdays (from recently to long time ago): \n';
    birthdaysList
        .sort(function (previousEl, nextEl) {
        const thisElBirthdayMonth = +previousEl.date.split('.')[1];
        const nextElBirthdayMonth = +nextEl.date.split('.')[1];
        return nextElBirthdayMonth - thisElBirthdayMonth;
    })
        .forEach((el, index) => {
        let phrase = `${index + 1}. ${el.first_name}`;
        if (el.last_name) {
            phrase += ` ${el.last_name}`;
        }
        result += `${phrase} \n`;
    });
    console.log(result);
    return result;
}
exports.BirthdaysLeftPhrase = BirthdaysLeftPhrase;
async function BirthdaysWillBePhrase(birthdaysList, amount = birthdaysList.length, start = 'beginning') {
    let result = 'In this year these users have had their birthdays already :\n';
    birthdaysList
        .sort(function (previousEl, nextEl) {
        const thisElBirthdayMonth = +previousEl.date.split('.')[1];
        const nextElBirthdayMonth = +nextEl.date.split('.')[1];
        return nextElBirthdayMonth - thisElBirthdayMonth;
    })
        .forEach((el, index) => {
        let phrase = `${index + 1}. ${el.first_name}`;
        if (el.last_name) {
            phrase += ` ${el.last_name}`;
        }
        result += `${phrase} \n`;
    });
    console.log(result);
    return result;
}
exports.BirthdaysWillBePhrase = BirthdaysWillBePhrase;
const BIRTHDAYPAST = (0, functions_1.BirthdaysTypes)().then((value) => {
    console.log(BirthdaysLeftPhrase(value.past));
    console.log(BirthdaysWillBePhrase(value.future));
});
