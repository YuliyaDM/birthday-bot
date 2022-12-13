import IMonthes from './IMonthes'
import ISeasonsList from './ISeasonsList'

interface ISeasons {
    [key: ISeasonsList]: IMonthes
}

export { ISeasons as default }
