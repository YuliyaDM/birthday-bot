import { IQueryButtons } from './IQueryButtons'

export interface ICallBackQuery {
    reply_markup: {
        inline_keyboard: IQueryButtons[][]
    },
    resize_keyboard?: boolean,
}
