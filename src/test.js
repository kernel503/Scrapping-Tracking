require('dotenv').config()
const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.telegram.sendMessage(
  process.env.BOT_ID,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus ante nec porttitor rhoncus. Proin pharetra elit ligula, ac convallis lacus tempus quis. Proin accumsan placerat convallis. Fusce in luctus lacus, ut auctor arcu. Vestibulum eu mi eget turpis convallis bibendum. Fusce eros urna, fermentum vitae rhoncus convallis, aliquet a enim. Nam efficitur nisi libero, vitae lacinia dolor consectetur ac. Suspendisse interdum lectus quis mauris mollis, ac ultrices quam ornare. Aliquam non tincidunt nisl. Praesent volutpat, neque ac dignissim maximus, quam enim viverra augue, quis interdum justo mauris id ipsum. Donec ac gravida nisi. Phasellus non libero et tellus gravida pharetra ut eu dui.'
)
// const getTrackFromCainiao = require('./scrapping-tracking/cainiao')
// async function test () {
//   const result = await getTrackFromCainiao('RB109626259SG')
//   console.log(result.length)
// }
// test()
