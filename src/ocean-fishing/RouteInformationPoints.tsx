import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import StopCardsContainer from './StopCardsContainer'
import StopCard from './StopCard'
import BaitList from './BaitList'
import { fishingSpots, fishes } from './ffxiv-ocean-fishing/data'
import { Stop, Time, StopTime } from './ffxiv-ocean-fishing'
import * as maps from './maps'
import { getBlueFish, getBaitGroup } from './utils'
import { translate } from '../utils'
import { useTranslation } from '../i18n'

const POINTS_THRESHOLD = 400

export function getPointsFishes (stopTime: StopTime): number[] {
  const fishingSpotId = maps.STOP_MAP[stopTime[0] as Stop]
  const spectralFishingSpot = fishingSpots[fishingSpotId + 1]
  const time = stopTime[1] as Time

  // Find all fish that exceed the threshold, while keeping track of the highest value fish(es)
  let highestPointsFishes: { fishId: number, points: number }[] = []
  const thresholdPointsFishes = spectralFishingSpot.fishes.filter(fishId => {
    const spreadsheetData = fishes[fishId].spreadsheetData

    // Check to see if this fish is catchable
    if (spreadsheetData.time && !spreadsheetData.time.includes(time)) {
      return false

    // Ignore blue fish so that the highest non-blue fish will be found
    } else if (spreadsheetData.intuition) {
      return false

    // Not enough known data on this fish
    } else if (!spreadsheetData.points || !spreadsheetData.doubleHook) {
      return false

    // Check what this fish is worth
    } else {
      const { doubleHook, points } = spreadsheetData
      const maxPoints = (Array.isArray(doubleHook) ? doubleHook[1] : doubleHook) * points
      if (highestPointsFishes.length === 0) {
        highestPointsFishes.push({ fishId, points: maxPoints })
      } else if (maxPoints === highestPointsFishes[0].points) {
        highestPointsFishes.push({ fishId, points: maxPoints })
      } else if (maxPoints > highestPointsFishes[0].points) {
        highestPointsFishes = [{ fishId, points: maxPoints }]
      }
      return maxPoints >= POINTS_THRESHOLD
    }
  })

  // If any fish passed the threshold hold, return all those fish
  if (thresholdPointsFishes.length > 0) {
    return thresholdPointsFishes

  // Otherwise, return whatever the best non-blue fish are
  } else {
    return highestPointsFishes.map(({ fishId }) => fishId)
  }
}

type Props = {
  stopTimes: [StopTime, StopTime, StopTime]
}

const RouteInformationPoints = ({ stopTimes }: Props) => {
  const { i18n } = useTranslation('ocean-fishing')
  const locale = i18n.language

  return (
    <StopCardsContainer>
      {stopTimes.map((stopTime, index) =>
        <StopCard key={stopTime} index={index} stopTime={stopTime}>
          <CardContent>
            <BaitList baitGroups={
              [
                maps.SPECTRAL_FISH_MAP[stopTime[0] as Stop],
                maps.GREEN_FISH_MAP[stopTime[0] as Stop],
                ...getPointsFishes(stopTime),
                getBlueFish(stopTime)
              ]
                .filter(x => x)
                .map((fishId, index) => {
                  const spreadsheetData = fishes[fishId].spreadsheetData
                  return {
                  header: translate(locale, fishes[fishId], 'name'),
                  baitGroupProps: {
                    ...getBaitGroup(fishId),
                    subtext: index === 0 ? '' : (
                      `DH: ×${Array.isArray(spreadsheetData.doubleHook) ? spreadsheetData.doubleHook.join('-') : spreadsheetData.doubleHook}` +
                      ` = ${(Array.isArray(spreadsheetData.doubleHook) ? spreadsheetData.doubleHook[1] : spreadsheetData.doubleHook) * spreadsheetData.points}`
                    ),
                    mainOnly: true
                  }
                }
              })
            } />
          </CardContent>
        </StopCard>
      )}
    </StopCardsContainer>
  )
}

export default RouteInformationPoints
