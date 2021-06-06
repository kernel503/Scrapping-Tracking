require('dotenv').config()
const getTrackInformation = require('./scrapping-tracking/scrapper')
const main = require('./email')

const url = process.env.MONGO_URI || 'NOT FOUND'
const db = require('monk')(url)
const collection = db.get('app')

async function getData () {
  try {
    const currentTrackInMongo = await collection.findOne()
    const { _id, ...items } = currentTrackInMongo

    const currentTrackOnline = await Promise.all(
      Object.keys(items).map(async track => {
        const result = await getTrackInformation(track)
        return result
      })
    )

    currentTrackOnline.forEach(currentValueOnline => {
      const [key] = Object.keys(currentValueOnline)

      if (
        currentValueOnline[key].correosv.length > items[key].correosv.length
      ) {
        console.log('Enviar msj local. ', key)
        const data = { ...items[key], ...currentValueOnline[key] }
        main(data, true)
      }

      if (
        !currentValueOnline[key].correosv.length &&
        currentValueOnline[key].cainiao.length > items[key].cainiao.length
      ) {
        console.log('Enviar msj extranjero. ', key)
        const data = { ...items[key], ...currentValueOnline[key] }
        main(data)
      }

      if (
        currentValueOnline[key].correosv.length > items[key].correosv.length
      ) {
        items[key].correosv = currentValueOnline[key].correosv
      }

      if (currentValueOnline[key].cainiao.length > items[key].cainiao.length) {
        items[key].cainiao = currentValueOnline[key].cainiao
      }
    })

    const update = await collection.update(_id, { $set: { ...items } })
    console.log('Elementos actualizados. ', update)
  } catch (error) {
    console.log(error)
  }
  db.close()
}

getData()
