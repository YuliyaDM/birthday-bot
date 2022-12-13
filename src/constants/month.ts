import ISeasons from '../common/interfaces/@types/seasons/ISeasons'

const SEASONS: ISeasons = {
  winter: {
    stickers: '❄⛄🏂🏻🎿',
    months: {
      december: '🏔🎄🎅🏻',
      january: '🧊⛸🍨',
      february: '🏒⛷🏂🏻'
    }
  },
  spring: {
    stickers: '🍃🌿🍀',
    months: {
      march: '🌼🌺🌹',
      april: '🌷🌸💐',
      may: '☀🥀🌻'
    }
  },
  summer: {
    stickers: '⛱🍉🌊',
    months: {
      june: '🍧🍹🕶️',
      july: '🏄🏻‍♂️🌾🌳',
      august: '🏖🏝🌞'
    }
  },
  autumn: {
    stickers: '🍂🍁🍃',
    months: {
      september: '🥮🌰🏕',
      october: '🍎🎃☕',
      november: '☁️🌫️🌆'
    }
  }
}

export { SEASONS as default }
