import { ILangList } from './langSettings/IList'

type Name = string | undefined;

export interface INewUserLang {
    username: Name,
    first_name: Name,
    last_name: Name,
    language: ILangList,
}
