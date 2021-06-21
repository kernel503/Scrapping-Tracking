const axios = require('axios')
const { JSDOM } = require('jsdom')

async function getTrackInformation (trackId) {
  let cainiao = []
  const { data } = await axios
    .get(`https://global.cainiao.com/detail.htm?mailNoList=${trackId}`)
    .catch(() => null)

  if (data) {
    const dom = new JSDOM(data)
    const $ = selector => dom.window.document.querySelector(selector)
    const textarea = JSON.parse($('#waybill_list_val_box').textContent.trim())
    cainiao = textarea.data[0].section2.detailList.map(
      ({ desc, status, time }) => ({ desc, status, time: time.slice(0, 10) })
    )
  }

  let correosv = []
  const response = await axios
    .get(`https://www.correos.gob.sv:8000/api/v1/rastrear-paquete/${trackId}`)
    .catch(() => null)

  if (response && response.status === 200) {
    correosv = response.data.eventos.map(
      ({ fecha: time, descripcion: desc, oficina: status }) => {
        return {
          time: time.slice(0, 10),
          desc,
          status
        }
      }
    )
  }

  return { [trackId]: { correosv, cainiao } }
}

module.exports = getTrackInformation
