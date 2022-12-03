import {ILangList} from "./IList";

type Name = string | undefined;

export interface IUserLang {
    username: Name,
    first_name: Name,
    last_name: Name,
    language: ILangList,
};