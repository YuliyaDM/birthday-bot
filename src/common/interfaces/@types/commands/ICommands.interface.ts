import ICallBackQueryLang from '../langSettings/CallBackQuery/ICallBackQueryLang.interface'
import IChooseLang from '../langSettings/IChooseLang.interface'
import ILanguages from '../langSettings/ICommands.interface'
import IGetAge from './IGetAge.interface'
import IGetBirthday from './IGetBirthday.interface'

export default interface ICommands {
    // main commands
    'start': ILanguages
    'help': ILanguages
    'about': ILanguages,
    'team': ILanguages,
    'getAge': IGetAge,
    'getBirthday': IGetBirthday,
    'hi'?: ILanguages,
    'chooseLanguage'?: IChooseLang,
    'callBackQuery'?: ICallBackQueryLang,
};
