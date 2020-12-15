const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const cheerio = require('cheerio')

// https://docs.google.com/spreadsheets/d/1brCfvmSdYl7RcY9lkgm_ds8uaFqq7qaxOOz-5BfHuuk/edit#gid=1833732342
const SHEET = fs.readFileSync(path.resolve(__dirname, './ocean-fishing.html'))
const $ = cheerio.load(SHEET.toString())

const REGIONS = [
  'Outer Galadion Bay',
  'Galadion Spectral Current',
  'The Southern Strait of Merlthor',
  'Southern Merlthor Spectral Current',
  'The Northern Strait of Merlthor',
  'Northern Merlthor Spectral Current',
  'Open Rhotano Sea',
  'Rhotano Spectral Current',
  'Cieldalaes Margin',
  'Cieldalaes Spectral Current',
  'Open Bloodbrine Sea',
  'Bloodbrine Spectral Current',
  'Outer Rothlyt Sound',
  'Rothlyt Spectral Current'
]

const data = {}

for (const region of REGIONS) {
  data[region] = []
  let tr = $('table.waffle tr').filter((_, elem) => $(elem).text().indexOf(region) >= 0).eq(0)
  tr = tr.next()

  for (let i = 0; i < 10; ++i) {
    tr = tr.next()
    data[region].push({
      name: tr.find('td:nth-child(3)').text().trim(),
      bait: (() => {
        if (isBlue(tr.find('td:nth-child(4)'))) {
          return 'Ragworm'
        }
        if (isBlue(tr.find('td:nth-child(5)'))) {
          return 'Krill'
        }
        if (isBlue(tr.find('td:nth-child(6)'))) {
          return 'Plump Worm'
        }
        console.log('UNKNOWN BAIT FOR:', tr.find('td:nth-child(3)').text().trim())
      })(),
      ragwormTimer: parseTimer(tr.find('td:nth-child(4)').text().trim()),
      krillTimer: parseTimer(tr.find('td:nth-child(5)').text().trim()),
      plumpWormTimer: parseTimer(tr.find('td:nth-child(6)').text().trim()),
      versatileLureTimer: parseTimer(tr.find('td:nth-child(7)').text().trim()),
      points: parsePoints(tr.find('td:nth-child(8)').text().trim()),
      doubleHook: parseDoubleHook(tr.find('td:nth-child(9)').text().trim()),
      mooch: tr.find('td:nth-child(10)').text().trim(),
      tug: parseTug(tr.find('td:nth-child(11)').text().trim()),
      // hookset: tr.find('td:nth-child(12)').text().trim(),
      timer: parseTimer(tr.find('td:nth-child(13)').text().trim()),
      time: tr.find('td:nth-child(14)').text().trim(),
      weathers: tr.find('td:nth-child(15)').text().trim(),
      // buff: tr.find('td:nth-child(16)').text().trim(),
      stars: parseStars(tr.find('td:nth-child(17)').text().trim())
      // canvas: tr.find('td:nth-child(18)').text().trim(),
      // notes: tr.find('td:nth-child(19)').text().trim()
    })
  }
}

function isBlue (elem) {
  for (const className of ['s36', 's46']) {
    if (elem.hasClass(className)) {
      return true
    }
  }
  return false
}

function parseTimer (str) {
  str = _.trim(str, '~s')
  if (/^\d+-\d+$/.test(str)) {
    return str.split('-').map(Number)
  }
  if (/^\d+(\.\d+)?$/.test(str)) {
    return Number(str)
  }
  if (/^.*@.*$/.test(str)) {
    return parseTimer(str.split('@')[1])
  }
  if (/^0 caught$/.test(str)) {
    return -1
  }
  if (str === '') {
    return null
  }
  console.log('UNKNOWN TIMER:', str)
  return null
}

function parsePoints (str) {
  if (/^\d+$/.test(str)) {
    return Number(str)
  }
  console.log('UNKNOWN POINTS:', str)
  return null
}

function parseDoubleHook (str) {
  if (/^\d+$/.test(str)) {
    return Number(str)
  }
  if (/^\d+ or \d+$/.test(str)) {
    return str.split(' or ').map(Number)
  }
  if (/^\d+ Assumed$/.test(str)) {
    return Number(str.match(/\d+/)[0])
  }
  console.log('UNKNOWN DOUBLE HOOK:', str)
  return null
}

function parseTug (str) {
  if (/^!+$/.test(str)) {
    return str.length
  }
  console.log('UNKNOWN TUG:', str)
  return null
}

function parseStars (str) {
  if (/^\d+$/.test(str)) {
    return Number(str)
  }
  console.log('UNKNOWN STARS:', str)
  return null
}

fs.writeFileSync(path.resolve(__dirname, './fish.json'), JSON.stringify(data, null, 2))
