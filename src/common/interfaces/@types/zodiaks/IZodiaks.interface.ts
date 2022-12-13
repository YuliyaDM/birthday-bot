/* eslint-disable no-unused-vars */
import IZodiak from './IZodiak.interface'
import IZodiaksList from './IZodiaksList.interface'

type IZodiaks = {
    [key in IZodiaksList]: IZodiak
}

export { IZodiaks as default }
