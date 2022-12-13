import IZodiak from './IZodiak'
import IZodiaksList from './IZodiaksList'

interface IZodiaks {
    [key: IZodiaksList]: IZodiak
}

export { IZodiaks as default }
