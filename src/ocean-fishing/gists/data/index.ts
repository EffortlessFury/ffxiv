import fishData from './ocean-fish-data.json'
import spreadsheetData from './spreadsheet-data.json'
import biteTimes from './ocean-fish-bite-times.json'

export type FishingSpot = {
  id: number,
  place_name_de: string,
  place_name_en: string,
  place_name_fr: string,
  place_name_ja: string,
  place_name_sub_de: string,
  place_name_sub_en: string,
  place_name_sub_fr: string,
  place_name_sub_ja: string,
  place_name_sub_no_article_de: string,
  place_name_sub_no_article_en: string,
  place_name_sub_no_article_fr: string,
  place_name_sub_no_article_ja: string,
  fishes: number[]
}

export type Fish = {
  id: number,
  name_de: string,
  name_en: string,
  name_fr: string,
  name_ja: string,
  description_de: string,
  description_en: string,
  description_fr: string,
  description_ja: string,
  icon: string,
  lodestone_data?: {
    url: string,
    icon_sm: string,
    icon_lg: string
  },
  spreadsheet_data: FishInfo
}

export type FishInfo = {
  name: string,
  bait?: number,
  points?: number,
  double_hook?: number | [number, number],
  mooch?: number,
  tug?: 1 | 2 | 3,
  bite_time: {
    all?: [number, number],
    [key: number]: [number, number]
  },
  time?: string,
  weathers?:
    { type: 'ALL' } |
    { type: 'OK', list: string[] } |
    { type: 'NOT OK', list: string[] },
  stars?: number,
  category?: 'octopus' | 'shark' | 'jellyfish' | 'seadragon' | 'balloon' | 'crab' | 'manta',
  intuition?: Array<{id: number, count: number}>
}

export type Bait = {
  id: number,
  name_de: string,
  name_en: string,
  name_fr: string,
  name_ja: string,
  icon: string
}

export type Achievement = {
  id: number,
  name_de: string,
  name_en: string,
  name_fr: string,
  name_ja: string,
  icon: string
}

const fishesByName = {}
Object.values(fishData.fishes).forEach(fish => { fishesByName[fish.name_en] = fish })

const baitsByName = {}
Object.values(fishData.baits).forEach(bait => { baitsByName[bait.name_en] = bait })

const spreadsheetFishes = Object.values(spreadsheetData).flatMap((x: Array<any>) => x)

// Attach spreadsheet data to fishes
for (const fishId in fishData.fishes) {
  const fish = fishData.fishes[fishId]
  const spreadsheetData = spreadsheetFishes.find(fishInfo => fishInfo.name === fish.name_en)
  if (spreadsheetData) {
    // Replace baits/mooches/intuitions with their corresponding IDs
    if (spreadsheetData.bait) spreadsheetData.bait = baitsByName[spreadsheetData.bait].id
    if (spreadsheetData.mooch) spreadsheetData.mooch = fishesByName[spreadsheetData.mooch].id
    if (spreadsheetData.intuition) spreadsheetData.intuition = spreadsheetData.intuition.map(({ name, count }) => ({ id: fishesByName[name].id, count }))
    // Replace biteTime with TC data
    spreadsheetData.bite_time = biteTimes[fishId]
  } else {
    console.error('Could find spreadsheet data for fish:', fish)
  }
  fish.spreadsheet_data = spreadsheetData
}

export const fishingSpots: { [key: number]: FishingSpot } = fishData.fishingSpots
export const fishes: { [key: number]: Fish } = <any>fishData.fishes
export const baits: { [key: number]: Bait } = fishData.baits
export const achievements: { [key: number]: Bait } = fishData.achievements
