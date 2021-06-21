require('dotenv').config()
const getTrackInformation = require('./scrapping-tracking/scrapper')
const main = require('./telegrafBot')

const url = process.env.MONGO_URI || 'NOT FOUND'
const db = require('monk')(url)
const collection = db.get('app')

async function getData () {
  try {
    const currentTrackInMongo = await collection.findOne()
    const { _id, ...items } = currentTrackInMongo

    const currentTrackOnline = await Promise.all(
      Object.keys(items).map(async track => await getTrackInformation(track))
    )

    for (let currentValueOnline of currentTrackOnline) {
      const [key] = Object.keys(currentValueOnline)

      if (
        currentValueOnline[key].correosv.length > items[key].correosv.length
      ) {
        const data = { ...items[key], ...currentValueOnline[key] }
        const target = key + ' - ' + items[key].name
        await main(target, data, true)
      }

      if (
        !currentValueOnline[key].correosv.length &&
        currentValueOnline[key].cainiao.length > items[key].cainiao.length
      ) {
        const data = { ...items[key], ...currentValueOnline[key] }
        const target = key + ' - ' + items[key].name
        await main(target, data)
      }

      if (
        currentValueOnline[key].correosv.length > items[key].correosv.length
      ) {
        items[key].correosv = currentValueOnline[key].correosv
      }

      if (currentValueOnline[key].cainiao.length > items[key].cainiao.length) {
        items[key].cainiao = currentValueOnline[key].cainiao
      }
    }
    await collection.update(_id, { $set: { ...items } })
    console.log('Proceso terminado.')
  } catch (error) {
    console.log(error)
  }
  db.close()
}

getData()
