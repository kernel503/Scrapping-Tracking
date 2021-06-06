const express = require('express')
require('dotenv').config()

const app = express()

const inserts = await collection.insert([
  {
    RB109626259SG: {
      name: 'Amazfit GTS 2 mini',
      image:
        'https://ae04.alicdn.com/kf/Ue5e5a384ea1446db89a1340977e13ecbu.png',
      cainiao: [],
      correosv: []
    },
    RB109631112SG: {
      name: 'Xiaomi Mi Watch',
      image:
        'https://ae04.alicdn.com/kf/U899bcf61d94d4360ae29e6abc49e430bc.jpeg',
      cainiao: [],
      correosv: []
    },
    RB110154843SG: {
      name: 'Mi Band 6',
      image:
        'https://ae04.alicdn.com/kf/Uc2ab5b78871a4c7a9258aed50d4823a69.jpg',
      cainiao: [],
      correosv: []
    },
    RB110158350SG: {
      name: 'Mi Band 6',
      image:
        'https://ae04.alicdn.com/kf/Uc2ab5b78871a4c7a9258aed50d4823a69.jpg',
      cainiao: [],
      correosv: []
    },
    RB110152900SG: {
      name: 'Mi Band 6',
      image:
        'https://ae04.alicdn.com/kf/Uc2ab5b78871a4c7a9258aed50d4823a69.jpg',
      cainiao: [],
      correosv: []
    }
  }
])

const url = process.env.MONGO_URI || 'NOT FOUND'
const db = require('monk')(url)
const collection = db.get('app')

app.get('/api/track', async (req, res) => {
  try {
    const items = await collection.findOne()
    res.json(items)
  } catch (error) {
    next(error)
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
