/* eslint-disable no-unused-vars */
import IMonthes from './IMonthes.interface'
import ISeasonsList from './ISeasonsList.interface'

type ISeasons = {
    [key in ISeasonsList]: IMonthes
}

export { ISeasons as default }
