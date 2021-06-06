const getTrackFromCainiao = require('./scrapping-tracking/cainiao')
async function test () {
  const result = await getTrackFromCainiao('RB109626259SG')
  console.log(result.length)
}
test()
