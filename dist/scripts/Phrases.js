"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirthdaysListPhrase = exports.BirthdaysWillBePhrase = exports.BirthdaysLeftPhrase = exports.WhoHasThisAgePhrase = exports.GetAgePhrase = exports.GetBirthdayPhrase = void 0;
/* eslint-disable no-unused-vars */
const moment_1 = __importDefault(require("moment"));
function GetBirthdayPhrase(userInfo) {
    // how many months will be of left
    const thisYear = (0, moment_1.default)().format('YYYY');
    const usersMomentDate = userInfo.date.split('.').reverse();
    usersMomentDate.splice(0, 1, thisYear);
    usersMomentDate.join('');
    // how many days will be or left
    const milisecondsDay = 86400000;
    const usersChangedDate = userInfo.date.split('.').reverse().join('-').replace(/\d{4}/gm, thisYear);
    const usersDate = `${usersChangedDate}T00:00:00.000Z`;
    const currentDate = Date.parse(new Date().toString());
    const leftDays = Math.round((currentDate - Date.parse(usersDate)) / milisecondsDay);
    const birthdayTime = (0, moment_1.default)(usersMomentDate, 'YYYYMMDD').from((0, moment_1.default)().add(1, 'day'));
    if (-1 !== birthdayTime.indexOf('ago')) {
        const phrase = `${userInfo.first_name}'s birthday was ${birthdayTime} (${leftDays} days left)`;
        return phrase;
    }
    const phrase = `${userInfo.first_name}'s birthday will be ${birthdayTime} (in ${leftDays} days)`;
    return phrase;
}
exports.GetBirthdayPhrase = GetBirthdayPhrase;
function GetAgePhrase(userInfo) {
    const newDate = new Date();
    const currentDate = [newDate.getFullYear(), newDate.getMonth(), newDate.getDay()];
    const usersBirthday = userInfo.date.split('.').reverse().map(el => +el);
    const usersAge = (0, moment_1.default)(currentDate).diff(usersBirthday, 'years');
    return usersAge;
}
exports.GetAgePhrase = GetAgePhrase;
function WhoHasThisAgePhrase(users) {
    let result = '';
    users.forEach((el, index) => {
        let phrase = `${index}. ${el.first_name}`;
        if (el.last_name) {
            phrase += ` ${el.last_name}`;
        }
        result += '\n';
        result += phrase;
    });
    return result;
}
exports.WhoHasThisAgePhrase = WhoHasThisAgePhrase;
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
    let result = 'In this year these users have had their birthdays already (from recently to long time) :\n';
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
async function BirthdaysListPhrase(birthdaysList, amount = birthdaysList.length, start = 'beginning') {
    let result = 'List of all users\' birthdays: \n';
    birthdaysList.forEach((el, index) => {
        let phrase = `${index + 1}. ${el.first_name}`;
        if (el.last_name) {
            phrase += ` ${el.last_name}`;
        }
        result += `${phrase} \n`;
    });
}
exports.BirthdaysListPhrase = BirthdaysListPhrase;
