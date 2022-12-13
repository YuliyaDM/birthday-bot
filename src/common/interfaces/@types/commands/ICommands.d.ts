import ICallBackQueryLang from '../langSettings/CallBackQuery/ICallBackQueryLang'
import IChooseLang from '../langSettings/IChooseLang'
import ILanguages from '../langSettings/ICommands'
import IGetAge from './IGetAge'
import IGetBirthday from './IGetBirthday'

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
