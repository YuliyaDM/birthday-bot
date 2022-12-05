import IGetAge from './commands/IGetAge'
import ICallBackQueryLang from './langSettings/CallBackQuery/ICallBackQueryLang'
import IChooseLang from './langSettings/IChooseLang'
import ILanguages from './langSettings/ICommands'

export default interface ICommands {
    // main commands
    'help': ILanguages
    'about': ILanguages,
    'start': ILanguages
    'hi'?: ILanguages,
    'getAge': IGetAge,
    'getBirthday': any,
    'chooseLanguage'?: IChooseLang,
    'callBackQuery'?: ICallBackQueryLang,
    'getBirthday'?: ILanguages,
};
