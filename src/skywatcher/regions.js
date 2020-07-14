import EorzeaWeather, { regions } from '@pillowfication/eorzea-weather'

export default [
  EorzeaWeather.REGION_LA_NOSCEA,
  EorzeaWeather.REGION_THE_BLACK_SHROUD,
  EorzeaWeather.REGION_THANALAN,
  EorzeaWeather.REGION_ISHGARD_AND_SURROUNDING_AREAS,
  EorzeaWeather.REGION_GYR_ABANIA,
  EorzeaWeather.REGION_THE_FAR_EAST,
  EorzeaWeather.REGION_NORVRANDT,
  EorzeaWeather.REGION_EUREKA,
  EorzeaWeather.REGION_OTHERS
].map((regionId) => ({
  regionId,
  query: regionId.replace(/[A-Z]/g, (w) => `_${w.toLowerCase()}`),
  zones: regions[regionId]
}))
