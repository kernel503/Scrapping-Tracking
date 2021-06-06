require('dotenv').config()
const nodemailer = require('nodemailer')

async function main (data, isRenderLocal = false) {
  const divCainiao = data.cainiao.reduce((accum, current, index) => {
    accum += `<li>${current.time} - ${current.desc} (${current.desc})</li>`
    if (index === data.cainiao.length - 1) {
      accum += '</ul></div>'
    }
    return accum
  }, '<div><b>Movimiento extranjero</b><ul>')

  const divCorreosv = data.correosv.reduce((accum, current, index) => {
    accum += `<li>${current.time} - ${current.desc} (${current.desc})</li>`
    if (index === data.correosv.length - 1) {
      accum += '</ul></div>'
    }
    return accum
  }, '<div><b>Movimiento local</b><ul>')

  const html = `<b>${data.name}</>
  <img style="margin: 10; border: 0; padding: 10; display: block;" width="300" height="300" src="${
    data.image
  }">
  ${isRenderLocal ? divCorreosv + divCainiao : divCainiao + divCorreosv}
  `

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })

  transporter
    .sendMail({
      from: 'Scrapper 👻',
      to: 'oo15004@ues.edu.sv',
      subject: 'Movimiento detectado 🎉',
      text: 'Movimiento detectado',
      html
    })
    .then(result => console.log(result))
    .catch(error => console.log(error))
}

main().catch(console.error)

module.exports = main
