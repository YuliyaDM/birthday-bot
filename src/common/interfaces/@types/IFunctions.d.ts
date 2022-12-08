export type IGetCommands = 'getAge' | 'getBirthday' | 'whoHasThisAge'

export type ICheckLangArr = (number | boolean)

export type IFindNameInGetCommands = (string | string[] | null)

export type IGetUsersInfo = Promise<any>

export interface IRequest {
    spreadsheetId: string,
    range: Array<string>
    auth: string,
}
