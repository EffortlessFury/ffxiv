import { Weather, Zone } from './consts'

const CHANCES: { [key in Zone]: [number, Weather][] } = {
  [Zone.AMH_ARAENG]: [
    [45, Weather.FAIR_SKIES],
    [60, Weather.CLOUDS],
    [70, Weather.DUST_STORMS],
    [80, Weather.HEAT_WAVES],
    [100, Weather.CLEAR_SKIES]
  ],
  [Zone.AZYS_LLA]: [
    [35, Weather.FAIR_SKIES],
    [70, Weather.CLOUDS],
    [100, Weather.THUNDER]
  ],
  [Zone.CENTRAL_SHROUD]: [
    [5, Weather.THUNDER],
    [20, Weather.RAIN],
    [30, Weather.FOG],
    [40, Weather.CLOUDS],
    [55, Weather.FAIR_SKIES],
    [85, Weather.CLEAR_SKIES],
    [100, Weather.FAIR_SKIES]
  ],
  [Zone.CENTRAL_THANALAN]: [
    [15, Weather.DUST_STORMS],
    [55, Weather.CLEAR_SKIES],
    [75, Weather.FAIR_SKIES],
    [85, Weather.CLOUDS],
    [95, Weather.FOG],
    [100, Weather.RAIN]
  ],
  [Zone.COERTHAS_CENTRAL_HIGHLANDS]: [
    [20, Weather.BLIZZARDS],
    [60, Weather.SNOW],
    [70, Weather.FAIR_SKIES],
    [75, Weather.CLEAR_SKIES],
    [90, Weather.CLOUDS],
    [100, Weather.FOG]
  ],
  [Zone.COERTHAS_WESTERN_HIGHLANDS]: [
    [20, Weather.BLIZZARDS],
    [60, Weather.SNOW],
    [70, Weather.FAIR_SKIES],
    [75, Weather.CLEAR_SKIES],
    [90, Weather.CLOUDS],
    [100, Weather.FOG]
  ],
  [Zone.EAST_SHROUD]: [
    [5, Weather.THUNDER],
    [20, Weather.RAIN],
    [30, Weather.FOG],
    [40, Weather.CLOUDS],
    [55, Weather.FAIR_SKIES],
    [85, Weather.CLEAR_SKIES],
    [100, Weather.FAIR_SKIES]
  ],
  [Zone.EASTERN_LA_NOSCEA]: [
    [5, Weather.FOG],
    [50, Weather.CLEAR_SKIES],
    [80, Weather.FAIR_SKIES],
    [90, Weather.CLOUDS],
    [95, Weather.RAIN],
    [100, Weather.SHOWERS]
  ],
  [Zone.EASTERN_THANALAN]: [
    [40, Weather.CLEAR_SKIES],
    [60, Weather.FAIR_SKIES],
    [70, Weather.CLOUDS],
    [80, Weather.FOG],
    [85, Weather.RAIN],
    [100, Weather.SHOWERS]
  ],
  [Zone.EULMORE]: [
    [10, Weather.GALES],
    [20, Weather.RAIN],
    [30, Weather.FOG],
    [45, Weather.CLOUDS],
    [85, Weather.FAIR_SKIES],
    [100, Weather.CLEAR_SKIES]
  ],
  [Zone.EUREKA_ANEMOS]: [
    [30, Weather.FAIR_SKIES],
    [60, Weather.GALES],
    [90, Weather.SHOWERS],
    [100, Weather.SNOW]
  ],
  [Zone.EUREKA_HYDATOS]: [
    [12, Weather.FAIR_SKIES],
    [34, Weather.SHOWERS],
    [56, Weather.GLOOM],
    [78, Weather.THUNDERSTORMS],
    [100, Weather.SNOW]
  ],
  [Zone.EUREKA_PAGOS]: [
    [10, Weather.FAIR_SKIES],
    [28, Weather.FOG],
    [46, Weather.HEAT_WAVES],
    [64, Weather.SNOW],
    [82, Weather.THUNDER],
    [100, Weather.BLIZZARDS]
  ],
  [Zone.EUREKA_PYROS]: [
    [10, Weather.FAIR_SKIES],
    [28, Weather.HEAT_WAVES],
    [46, Weather.THUNDER],
    [64, Weather.BLIZZARDS],
    [82, Weather.UMBRAL_WIND],
    [100, Weather.SNOW]
  ],
  [Zone.GRIDANIA]: [
    [5, Weather.RAIN],
    [20, Weather.RAIN],
    [30, Weather.FOG],
    [40, Weather.CLOUDS],
    [55, Weather.FAIR_SKIES],
    [85, Weather.CLEAR_SKIES],
    [100, Weather.FAIR_SKIES]
  ],
  [Zone.IDYLLSHIRE]: [
    [10, Weather.CLOUDS],
    [20, Weather.FOG],
    [30, Weather.RAIN],
    [40, Weather.SHOWERS],
    [70, Weather.CLEAR_SKIES],
    [100, Weather.FAIR_SKIES]
  ],
  [Zone.IL_MHEG]: [
    [10, Weather.RAIN],
    [20, Weather.FOG],
    [35, Weather.CLOUDS],
    [45, Weather.THUNDERSTORMS],
    [60, Weather.CLEAR_SKIES],
    [100, Weather.FAIR_SKIES]
  ],
  [Zone.ISHGARD]: [
    [60, Weather.SNOW],
    [70, Weather.FAIR_SKIES],
    [75, Weather.CLEAR_SKIES],
    [90, Weather.CLOUDS],
    [100, Weather.FOG]
  ],
  [Zone.KHOLUSIA]: [
    [10, Weather.GALES],
    [20, Weather.RAIN],
    [30, Weather.FOG],
    [45, Weather.CLOUDS],
    [85, Weather.FAIR_SKIES],
    [100, Weather.CLEAR_SKIES]
  ],
  [Zone.KUGANE]: [
    [10, Weather.RAIN],
    [20, Weather.FOG],
    [40, Weather.CLOUDS],
    [80, Weather.FAIR_SKIES],
    [100, Weather.CLEAR_SKIES]
  ],
  [Zone.LAKELAND]: [
    [20, Weather.CLEAR_SKIES],
    [60, Weather.FAIR_SKIES],
    [75, Weather.CLOUDS],
    [85, Weather.FOG],
    [95, Weather.RAIN],
    [100, Weather.THUNDERSTORMS]
  ],
  [Zone.LIMSA_LOMINSA]: [
    [20, Weather.CLOUDS],
    [50, Weather.CLEAR_SKIES],
    [80, Weather.FAIR_SKIES],
    [90, Weather.FOG],
    [100, Weather.RAIN]
  ],
  [Zone.LOWER_LA_NOSCEA]: [
    [20, Weather.CLOUDS],
    [50, Weather.CLEAR_SKIES],
    [70, Weather.FAIR_SKIES],
    [80, Weather.WIND],
    [90, Weather.FOG],
    [100, Weather.RAIN]
  ],
  [Zone.MIDDLE_LA_NOSCEA]: [
    [20, Weather.CLOUDS],
    [50, Weather.CLEAR_SKIES],
    [70, Weather.FAIR_SKIES],
    [80, Weather.WIND],
    [90, Weather.FOG],
    [100, Weather.RAIN]
  ],
  [Zone.MIST]: [
    [20, Weather.CLOUDS],
    [50, Weather.CLEAR_SKIES],
    [70, Weather.FAIR_SKIES],
    [80, Weather.FAIR_SKIES],
    [90, Weather.FOG],
    [100, Weather.RAIN]
  ],
  [Zone.MOR_DHONA]: [
    [15, Weather.CLOUDS],
    [30, Weather.FOG],
    [60, Weather.GLOOM],
    [75, Weather.CLEAR_SKIES],
    [100, Weather.FAIR_SKIES]
  ],
  [Zone.NORTH_SHROUD]: [
    [5, Weather.FOG],
    [10, Weather.SHOWERS],
    [25, Weather.RAIN],
    [30, Weather.FOG],
    [40, Weather.CLOUDS],
    [70, Weather.FAIR_SKIES],
    [100, Weather.CLEAR_SKIES]
  ],
  [Zone.NORTHERN_THANALAN]: [
    [5, Weather.CLEAR_SKIES],
    [20, Weather.FAIR_SKIES],
    [50, Weather.CLOUDS],
    [100, Weather.FOG]
  ],
  [Zone.OUTER_LA_NOSCEA]: [
    [30, Weather.CLEAR_SKIES],
    [50, Weather.FAIR_SKIES],
    [70, Weather.CLOUDS],
    [85, Weather.FOG],
    [100, Weather.RAIN]
  ],
  [Zone.RHALGRS_REACH]: [
    [15, Weather.CLEAR_SKIES],
    [60, Weather.FAIR_SKIES],
    [80, Weather.CLOUDS],
    [90, Weather.FOG],
    [100, Weather.THUNDER]
  ],
  [Zone.SHIROGANE]: [
    [10, Weather.RAIN],
    [20, Weather.FOG],
    [40, Weather.CLOUDS],
    [80, Weather.FAIR_SKIES],
    [100, Weather.CLEAR_SKIES]
  ],
  [Zone.SOUTH_SHROUD]: [
    [5, Weather.FOG],
    [10, Weather.THUNDERSTORMS],
    [25, Weather.THUNDER],
    [30, Weather.FOG],
    [40, Weather.CLOUDS],
    [70, Weather.FAIR_SKIES],
    [100, Weather.CLEAR_SKIES]
  ],
  [Zone.SOUTHERN_THANALAN]: [
    [20, Weather.HEAT_WAVES],
    [60, Weather.CLEAR_SKIES],
    [80, Weather.FAIR_SKIES],
    [90, Weather.CLOUDS],
    [100, Weather.FOG]
  ],
  [Zone.THE_AZIM_STEPPE]: [
    [5, Weather.GALES],
    [10, Weather.WIND],
    [17, Weather.RAIN],
    [25, Weather.FOG],
    [35, Weather.CLOUDS],
    [75, Weather.FAIR_SKIES],
    [100, Weather.CLEAR_SKIES]
  ],
  [Zone.THE_BOZJAN_SOUTHERN_FRONT]: [
    [53, Weather.FAIR_SKIES],
    [65, Weather.RAIN],
    [77, Weather.WIND],
    [89, Weather.THUNDER],
    [100, Weather.DUST_STORMS]
  ],
  [Zone.THE_CHURNING_MISTS]: [
    [10, Weather.CLOUDS],
    [20, Weather.GALES],
    [40, Weather.UMBRAL_STATIC],
    [70, Weather.CLEAR_SKIES],
    [100, Weather.FAIR_SKIES]
  ],
  [Zone.THE_CRYSTARIUM]: [
    [20, Weather.CLEAR_SKIES],
    [60, Weather.FAIR_SKIES],
    [75, Weather.CLOUDS],
    [85, Weather.FOG],
    [95, Weather.RAIN],
    [100, Weather.THUNDERSTORMS]
  ],
  [Zone.THE_DIADEM]: [
    [30, Weather.FAIR_SKIES],
    [60, Weather.FOG],
    [90, Weather.WIND],
    [100, Weather.UMBRAL_WIND]
  ],
  [Zone.THE_DRAVANIAN_FORELANDS]: [
    [10, Weather.CLOUDS],
    [20, Weather.FOG],
    [30, Weather.THUNDER],
    [40, Weather.DUST_STORMS],
    [70, Weather.CLEAR_SKIES],
    [100, Weather.FAIR_SKIES]
  ],
  [Zone.THE_DRAVANIAN_HINTERLANDS]: [
    [10, Weather.CLOUDS],
    [20, Weather.FOG],
    [30, Weather.RAIN],
    [40, Weather.SHOWERS],
    [70, Weather.CLEAR_SKIES],
    [100, Weather.FAIR_SKIES]
  ],
  [Zone.THE_FRINGES]: [
    [15, Weather.CLEAR_SKIES],
    [60, Weather.FAIR_SKIES],
    [80, Weather.CLOUDS],
    [90, Weather.FOG],
    [100, Weather.THUNDER]
  ],
  [Zone.THE_GOBLET]: [
    [40, Weather.CLEAR_SKIES],
    [60, Weather.FAIR_SKIES],
    [85, Weather.CLOUDS],
    [95, Weather.FOG],
    [100, Weather.RAIN]
  ],
  [Zone.THE_LAVENDER_BEDS]: [
    [5, Weather.CLOUDS],
    [20, Weather.RAIN],
    [30, Weather.FOG],
    [40, Weather.CLOUDS],
    [55, Weather.FAIR_SKIES],
    [85, Weather.CLEAR_SKIES],
    [100, Weather.FAIR_SKIES]
  ],
  [Zone.THE_LOCHS]: [
    [20, Weather.CLEAR_SKIES],
    [60, Weather.FAIR_SKIES],
    [80, Weather.CLOUDS],
    [90, Weather.FOG],
    [100, Weather.THUNDERSTORMS]
  ],
  [Zone.THE_PEAKS]: [
    [10, Weather.CLEAR_SKIES],
    [60, Weather.FAIR_SKIES],
    [75, Weather.CLOUDS],
    [85, Weather.FOG],
    [95, Weather.WIND],
    [100, Weather.DUST_STORMS]
  ],
  [Zone.THE_RAKTIKA_GREATWOOD]: [
    [10, Weather.FOG],
    [20, Weather.RAIN],
    [30, Weather.UMBRAL_WIND],
    [45, Weather.CLEAR_SKIES],
    [85, Weather.FAIR_SKIES],
    [100, Weather.CLOUDS]
  ],
  [Zone.THE_RUBY_SEA]: [
    [10, Weather.THUNDER],
    [20, Weather.WIND],
    [35, Weather.CLOUDS],
    [75, Weather.FAIR_SKIES],
    [100, Weather.CLEAR_SKIES]
  ],
  [Zone.THE_SEA_OF_CLOUDS]: [
    [30, Weather.CLEAR_SKIES],
    [60, Weather.FAIR_SKIES],
    [70, Weather.CLOUDS],
    [80, Weather.FOG],
    [90, Weather.WIND],
    [100, Weather.UMBRAL_WIND]
  ],
  [Zone.THE_TEMPEST]: [
    [20, Weather.CLOUDS],
    [80, Weather.FAIR_SKIES],
    [100, Weather.CLEAR_SKIES]
  ],
  [Zone.ULDAH]: [
    [40, Weather.CLEAR_SKIES],
    [60, Weather.FAIR_SKIES],
    [85, Weather.CLOUDS],
    [95, Weather.FOG],
    [100, Weather.RAIN]
  ],
  [Zone.UPPER_LA_NOSCEA]: [
    [30, Weather.CLEAR_SKIES],
    [50, Weather.FAIR_SKIES],
    [70, Weather.CLOUDS],
    [80, Weather.FOG],
    [90, Weather.THUNDER],
    [100, Weather.THUNDERSTORMS]
  ],
  [Zone.WESTERN_LA_NOSCEA]: [
    [10, Weather.FOG],
    [40, Weather.CLEAR_SKIES],
    [60, Weather.FAIR_SKIES],
    [80, Weather.CLOUDS],
    [90, Weather.WIND],
    [100, Weather.GALES]
  ],
  [Zone.WESTERN_THANALAN]: [
    [40, Weather.CLEAR_SKIES],
    [60, Weather.FAIR_SKIES],
    [85, Weather.CLOUDS],
    [95, Weather.FOG],
    [100, Weather.RAIN]
  ],
  [Zone.WOLVES_DEN_PIER]: [
    [20, Weather.CLOUDS],
    [50, Weather.CLEAR_SKIES],
    [80, Weather.FAIR_SKIES],
    [90, Weather.FOG],
    [100, Weather.THUNDERSTORMS]
  ],
  [Zone.YANXIA]: [
    [5, Weather.SHOWERS],
    [15, Weather.RAIN],
    [25, Weather.FOG],
    [40, Weather.CLOUDS],
    [80, Weather.FAIR_SKIES],
    [100, Weather.CLEAR_SKIES]
  ]
}

export default CHANCES