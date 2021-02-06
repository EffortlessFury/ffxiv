import fs from 'fs'
import path from 'path'
import * as saintCoinach from '../../../saint-coinach'

/*  eslint-disable @typescript-eslint/naming-convention */
// There are no differences yet
const CharaMakeName_en = saintCoinach.get('CharaMakeName.en')
// const CharaMakeName_de = saintCoinach.get('CharaMakeName.de')
// const CharaMakeName_fr = saintCoinach.get('CharaMakeName.fr')
// const CharaMakeName_ja = saintCoinach.get('CharaMakeName.ja')
// const CharaMakeName_ko = saintCoinach.get('CharaMakeName', 'ko')

console.log('Collecting names...')
const charaMakeNames = Object.keys(CharaMakeName_en.keys)
  .map(key => ({ key, values: CharaMakeName_en.data.map(datum => datum[key]).filter(datum => datum) }))
  .reduce((acc, { key, values }) => {
    if (key !== '#') {
      acc[key.replace(/[^a-zA-Z]+/g, '')] = (values as string[]).sort()
    }
    return acc
  }, {})
fs.writeFileSync(path.resolve(__dirname, '../data/chara-make-names.json'), JSON.stringify(charaMakeNames))
