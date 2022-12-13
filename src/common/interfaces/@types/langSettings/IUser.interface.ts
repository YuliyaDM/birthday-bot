import ILangList from './IList.interface'

type Name = string | undefined;

export default interface IUserLang {
    username: Name,
    first_name: Name,
    last_name: Name,
    language: ILangList,
};
