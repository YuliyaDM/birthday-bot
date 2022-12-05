"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsernameInCommand = exports.CheckLangArr = exports.CreateUserLang = exports.CheckLanguage = void 0;
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
function GetUsernameInCommand(text) {
    const regexps = {
        removeCommand: /^.*\/get(Age|Birthday)( ){0,}|( ){1,}$/mg,
        findError: /[^A-z0-9_@ ]/gm,
        findSpace: / /gm
    };
    const { removeCommand, findError, findSpace } = regexps;
    const matchName = text.replace(removeCommand, '');
    const isError = matchName.match(findError);
    console.log(isError);
    if (!isError) {
        if (matchName.length) {
            if (matchName.match(findSpace)) {
                return matchName.split(' ');
            }
            return matchName;
        }
        return '';
    }
    return null;
}
exports.GetUsernameInCommand = GetUsernameInCommand;
console.log(GetUsernameInCommand('/getBirthday Julia Pirogova'));
console.log(GetUsernameInCommand('/getAge Julia'));
console.log(GetUsernameInCommand('/getAge'));
