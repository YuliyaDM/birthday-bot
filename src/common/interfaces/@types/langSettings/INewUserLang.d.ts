import ILangList from './IList'

type Name = string | undefined;

export default interface INewUserLang {
    username: Name,
    first_name: string,
    last_name: Name,
    language: ILangList,
}
