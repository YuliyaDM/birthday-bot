import ICommands from '../common/interfaces/@types/ICommands'

export const commands: ICommands = {
  help: {
    English:
            `<em>/about</em> - about this bot.
            <em>/help</em> - list of commands.
<em>/start</em> - start this bot.`,
    Ukrainian:
            `<em>/about</em> - про цього бота.
<em>/help</em> - перелік усіх команд.
<em>/start</em> - перезапустити бота або почати спілкування з ним.`
  },
  about: {
    English:
            'This bot has created by <strong>Julia</strong> and <strong>Lera</strong> recently',
    Ukrainian:
            'Цей бот створений <strong>Julia</strong> і <strong>Lera</strong> нещодавно'
  },
  start: {
    English:
            'Hello! This bot have commands for <u>getting birthdays</u>!',
    Ukrainian:
            'Привіт! Цей бот має команди для <u>отримання дня народження користувачів</u>!'
  },
  getAge: {
    emptyStr: {
      Ukrainian: 'Добре. Напишіть <bold>ім\'я, або фамілію, або юзернейм</bold> користувача, щоб отримати його вік.',
      English: 'Okay. Write <bold>name, last_name or username</bold> of user to get their age/'
    }
  },
  chooseLanguage: {
    English: {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Ukrainian', callback_data: 'Ukrainian' },
            { text: 'English', callback_data: 'English' }
          ]
        ]
      },
      resize_keyboard: true
    },
    Ukrainian: {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Українська', callback_data: 'Ukrainian' },
            { text: 'Англійська', callback_data: 'English' }
          ]
        ]
      },
      resize_keyboard: true
    },
    phrase: {
      English: 'Okay, so now you can choose your language.',
      Ukrainian: 'Добре, зараз ви можете обрати свою мову.'
    }
  },
  callBackQuery: {
    English: {
      English: 'Nothing has changed.',
      Ukrainian: 'Встановлено!'
    },
    Ukrainian: {
      Ukrainian: 'Нічого не змінилося.',
      English: 'Language is updated!'
    }
  }
}
