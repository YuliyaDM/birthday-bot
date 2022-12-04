import ICommands from '../common/interfaces/@types/ICommands'

export const commands: ICommands = {
  help: {
    English:
            `/about - about this bot.
/help - list of commands.
/start - start this bot.`,
    Ukrainian:
            `/about - про цього бота.
/help - перелік усіх команд.
/start - перезапустити бота або почати спілкування з ним.`
  },
  about: {
    English:
            'This bot has created by Julia and Lera recently',
    Ukrainian:
            'Цей бот створений Julia і Lera нещодавно'
  },
  start: {
    English:
            'Hello! This bot have commands for getting birthdays!',
    Ukrainian:
            'Привіт! Цей бот має команди для отримання дня народження користувачів.'
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
