import ICallBackQueryLang from './langSettings/CallBackQuery/ICallBackQueryLang'
import IChooseLang from './langSettings/IChooseLang'
import ILanguages from './langSettings/ICommands'

export default interface ICommands {
    'help': ILanguages
    'about': ILanguages,
    'start': ILanguages
    'hi'?: ILanguages,
    'chooseLanguage'?: IChooseLang,
    'callBackQuery'?: ICallBackQueryLang,
    'getBirthday'?: ILanguages,
};
