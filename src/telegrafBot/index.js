require('dotenv').config()
const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

const sendMessage = async list => {
  let index = 1
  for (let state of list) {
    await bot.telegram.sendMessage(
      '696238891',
      `${index}. ${state.time} - ${state.desc} (${state.status})`
    )
    index++
  }
}

async function main (target, data, isRenderLocal = false) {
  if (isRenderLocal) {
    await bot.telegram.sendMessage('696238891', 'Movimiento local detectado 🎉')
    await bot.telegram.sendMessage('696238891', target)
    await sendMessage(data.correosv)
  } else {
    await bot.telegram.sendMessage(
      '696238891',
      'Movimiento extranjero detectado 👾'
      )
      await bot.telegram.sendMessage('696238891', target)
      await sendMessage(data.cainiao)
  }
}

module.exports = main
