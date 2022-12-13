import { IMatchGetCommands, IRegexpsGetCommands } from '../common/interfaces/@types/IRegexp.interface'

export const getBirthday: IRegexpsGetCommands = {
  removeCommand: /^.*\/getBirthday( ){0,}|( ){1,}$/mg,
  findError: /[^A-z0-9_@ ]/gm,
  findSpace: / /gm
}

export const getAge: IRegexpsGetCommands = {
  removeCommand: /^.*\/getAge( ){0,}|( ){1,}$/gm,
  findError: /[^A-z0-9_@ ]/gm,
  findSpace: / /gm
}

export const matchGetCommands: IMatchGetCommands = {
  findCommands: /(get(Birthday|Age))|(whoHasThisAge)/gm
}

export const whoHasThisAge: Required<IRegexpsGetCommands> = {
  removeCommand: /^.*\/whoHasThisAge( ){0,}|( ){1,}$/gm,
  findError: /[^0-9]/gm,
  findSpace: / /gm,
  findDigits: /[0-9]{1,}/gm
}
