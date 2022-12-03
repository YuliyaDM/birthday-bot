"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBirthdayUser = exports.CheckLangArr = exports.CreateUserLang = exports.CheckLanguage = void 0;
function CheckLanguage(usersLang, name) {
    for (let i = 0, userLangLength = usersLang.length; i < userLangLength; i++) {
        const el = usersLang[i];
        const keys = Object.values(el);
        for (let s = 0, keysL = keys.length; s < keysL; s++) {
            const key = keys[s];
            if (key === name)
                return el.language;
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
            if (key === name)
                return i;
        }
    }
    return false;
}
exports.CheckLangArr = CheckLangArr;
function CheckBirthdayUser(text) {
    const regexpCheckString = /\/getBirthday(( [@A-z0-9]{1,}){2})|( [@A-z0-9]{1,})/gm;
    const correctString = regexpCheckString.test(text);
    console.log(text.match(regexpCheckString));
    if (correctString || text === '/getBirthday') {
        const result = text.replace(/\/getBirthday/gm, '').replace(/( $|^ )/gm, '');
        return result;
    }
    return 'I cannot understand this command.';
}
exports.CheckBirthdayUser = CheckBirthdayUser;
const TEST1 = '/getBirthday @quartz555'; // nickname
const TEST2 = '/getBirthday Bogdan';
const TEST3 = '/getBirthday Grishin';
const TEST4 = '/getBirthday Bogdan Grishin';
const TEST5 = '/getBirthday';
const TEST6 = '/getBirthday 23jioc=23=-ox';
console.log(CheckBirthdayUser(TEST1));
console.log(CheckBirthdayUser(TEST2));
console.log(CheckBirthdayUser(TEST3));
console.log(CheckBirthdayUser(TEST4));
console.log(CheckBirthdayUser(TEST5));
console.log(CheckBirthdayUser(TEST6));
