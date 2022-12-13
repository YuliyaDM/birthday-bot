export interface IRegexpsGetCommands {
    removeCommand: RegExp,
    findError: RegExp,
    findSpace: RegExp,
    findDigits?: RegExp
}

export interface IMatchGetCommands {
    findCommands: RegExp
}
