import IQueryButtons from './IQueryButtons'

export default interface ICallBackQuery {
    reply_markup: {
        inline_keyboard: IQueryButtons[][]
    },
    resize_keyboard?: boolean,
}
