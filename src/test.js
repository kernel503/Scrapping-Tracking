require('dotenv').config()
const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.telegram.sendMessage(process.env.BOT_ID, 'Hola')
// const getTrackFromCainiao = require('./scrapping-tracking/cainiao')
// async function test () {
//   const result = await getTrackFromCainiao('RB109626259SG')
//   console.log(result.length)
// }
// test()
