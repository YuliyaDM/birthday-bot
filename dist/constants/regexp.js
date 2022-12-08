"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whoHasThisAge = exports.matchGetCommands = exports.getAge = exports.getBirthday = void 0;
exports.getBirthday = {
    removeCommand: /^.*\/getBirthday( ){0,}|( ){1,}$/mg,
    findError: /[^A-z0-9_@ ]/gm,
    findSpace: / /gm
};
exports.getAge = {
    removeCommand: /^.*\/getAge( ){0,}|( ){1,}$/gm,
    findError: /[^A-z0-9_@ ]/gm,
    findSpace: / /gm
};
exports.matchGetCommands = {
    findCommands: /(get(Birthday|Age))|(whoHasThisAge)/gm
};
exports.whoHasThisAge = {
    removeCommand: /^.*\/whoHasThisAge( ){0,}|( ){1,}$/gm,
    findError: /[^0-9]/gm,
    findSpace: / /gm,
    findDigits: /[0-9]{1,}/gm
};
