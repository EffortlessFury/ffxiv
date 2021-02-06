import fs from 'fs'
import path from 'path'
import csvParse from 'csv-parse/lib/sync'

// What to do about this...
const SAINT_COINACH_FOLDER = 'C:\\Users\\Pillowfication\\ws\\SaintCoinach.Cmd-master-b930-8ab7d24'
const VERSION = '2021.01.28.0000.0000'
const SAINT_COINACH_KO = 'C:\\Users\\Pillowfication\\ws\\ffxiv-datamining-ko'

function mapKeys (keys: Record<string, string>, datum: {}): Record<string, string> {
  const mappedDatum = {}
  for (const [key, value] of Object.entries(datum)) {
    mappedDatum[keys[key] !== '' ? keys[key] : `<UNKNOWN_${key}>`] = value
  }
  return mappedDatum
}

function parseValues (types: Record<string, string>, datum: Record<string, any>): Record<string, any> {
  for (const [key, value] of Object.entries(datum)) {
    const type = types[key]
    if (/^s?byte$/.test(type) || /^u?int\d+$/.test(type)) {
      datum[key] = Number(value)
    } else if (/^bit&\d+$/.test(type)) {
      datum[key] = (value === 'True')
    } else if (type === 'Color') {
      const color = Number(value)
      datum[key] = {
        R: (color & 0xFF0000) >> 16,
        G: (color & 0x00FF00) >> 8,
        B: (color & 0x0000FF) >> 0
      }
    }
  }
  return datum
}

export function get (key: string, folder?: 'ko'): { keys: Record<string, string>, types: Record<string, string>, data: any[] } {
  let file = path.join(SAINT_COINACH_FOLDER, VERSION, 'raw-exd-all', `${key}.csv`)
  if (folder === 'ko') {
    file = path.join(SAINT_COINACH_KO, 'csv', `${key}.csv`)
  }
  console.log('Reading file', file)

  const buffer = fs.readFileSync(file)
  const csv = csvParse(buffer.toString(), { columns: true })
  const [_keys, _types, ..._data] = csv

  const keys = mapKeys(_keys, _keys)
  const types = mapKeys(_keys, _types)
  const data = _data.map((datum: any) => parseValues(types, mapKeys(_keys, datum))) as any[]

  return { keys, types, data }
}

function padZeroes (id: number): string {
  return `000000${id}`.slice(-6)
}

export function parseIconId (icon: string): number {
  const match = icon.match(/^ui\/icon\/\d{6}\/(\d{6}).(?:tex|png)$/)
  if (match !== null) {
    return Number(match[1])
  } else {
    throw new Error(`Could not parse Icon ID from '${icon}'`)
  }
}

export function getIcon (id: number): { path: string, buffer: Buffer } {
  const folder = padZeroes(id - (id % 1000))
  const fileName = padZeroes(id)

  const file = path.join(SAINT_COINACH_FOLDER, VERSION, 'ui/icon', folder, fileName + '.png')
  const buffer = fs.readFileSync(file)

  return { path: file, buffer }
}

// This function is whack for now
// export function getMap (mapId: string): { path: string, buffer: Buffer } {
//   const [id, index] = mapId.split('/')
//
//   const file = path.join(SAINT_COINACH_FOLDER, VERSION, 'ui/map', folder, fileName + '.png')
//   const buffer = fs.readFileSync(file)
//
//   return { path: file, buffer }
// }

class Crawler {
  data: any

  constructor (csv: any, id: number) {
    this.data = csv.data.find(({ '#': csvId }) => csvId === id)
  }

  to (key: string, csv: any): Crawler {
    return new Crawler(csv, Number(this.data[key]))
  }

  get (): any {
    return this.data
  }
}

export function crawl (csv: any, id: number): Crawler {
  return new Crawler(csv, id)
}
