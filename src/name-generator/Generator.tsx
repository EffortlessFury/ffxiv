import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Section from '../Section'
import MidlanderMale from './MidlanderMale'
import MidlanderFemale from './MidlanderFemale'
import HighlanderMale from './HighlanderMale'
import HighlanderFemale from './HighlanderFemale'
import WildwoodMale from './WildwoodMale'
import WildwoodFemale from './WildwoodFemale'
import DuskwightMale from './DuskwightMale'
import DuskwightFemale from './DuskwightFemale'
import PlainsfolkMale from './PlainsfolkMale'
import PlainsfolkFemale from './PlainsfolkFemale'
import DunesfolkMale from './DunesfolkMale'
import DunesfolkFemale from './DunesfolkFemale'
import SeekerOfTheSunMale from './SeekerOfTheSunMale'
import SeekerOfTheSunFemale from './SeekerOfTheSunFemale'
import KeeperOfTheMoonMale from './KeeperOfTheMoonMale'
import KeeperOfTheMoonFemale from './KeeperOfTheMoonFemale'
import SeaWolfMale from './SeaWolfMale'
import SeaWolfFemale from './SeaWolfFemale'
import HellsguardMale from './HellsguardMale'
import HellsguardFemale from './HellsguardFemale'
import generate, { getClans, getGenders, translate } from '../name-generator/names'
import { Race, Clan, Gender } from '../name-generator/names/types'
import i18n from '../i18n'
import { I18n, TFunction } from 'next-i18next'

const RACES = [
  Race.Hyur,
  Race.Elezen,
  Race.Lalafell,
  Race.Miqote,
  Race.Roegadyn,
  Race.AuRa,
  Race.Hrothgar,
  Race.Viera
]
const ADVANCED: { [key: string]: any } = {
  [`${Clan.Midlander},${Gender.Male}`]: MidlanderMale,
  [`${Clan.Midlander},${Gender.Female}`]: MidlanderFemale,
  [`${Clan.Highlander},${Gender.Male}`]: HighlanderMale,
  [`${Clan.Highlander},${Gender.Female}`]: HighlanderFemale,
  [`${Clan.Wildwood},${Gender.Male}`]: WildwoodMale,
  [`${Clan.Wildwood},${Gender.Female}`]: WildwoodFemale,
  [`${Clan.Duskwight},${Gender.Male}`]: DuskwightMale,
  [`${Clan.Duskwight},${Gender.Female}`]: DuskwightFemale,
  [`${Clan.Plainsfolk},${Gender.Male}`]: PlainsfolkMale,
  [`${Clan.Plainsfolk},${Gender.Female}`]: PlainsfolkFemale,
  [`${Clan.Dunesfolk},${Gender.Male}`]: DunesfolkMale,
  [`${Clan.Dunesfolk},${Gender.Female}`]: DunesfolkFemale,
  [`${Clan.SeekerOfTheSun},${Gender.Male}`]: SeekerOfTheSunMale,
  [`${Clan.SeekerOfTheSun},${Gender.Female}`]: SeekerOfTheSunFemale,
  [`${Clan.KeeperOfTheMoon},${Gender.Male}`]: KeeperOfTheMoonMale,
  [`${Clan.KeeperOfTheMoon},${Gender.Female}`]: KeeperOfTheMoonFemale,
  [`${Clan.SeaWolf},${Gender.Male}`]: SeaWolfMale,
  [`${Clan.SeaWolf},${Gender.Female}`]: SeaWolfFemale,
  [`${Clan.Hellsguard},${Gender.Male}`]: HellsguardMale,
  [`${Clan.Hellsguard},${Gender.Female}`]: HellsguardFemale
}

function randomElement<T> (array: T[]) {
  return array[Math.floor(Math.random() * array.length)]
}

const useStyles = makeStyles(theme => ({
  results: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(4),
      padding: theme.spacing(2),
    },
    fontSize: '1.75em',
    '& > span': {
      display: 'block',
      margin: theme.spacing(1),
      textAlign: 'center',
      whiteSpace: 'nowrap'
    }
  }
}))

type Props = {
  t: TFunction,
  i18n: I18n
}

const Generator = ({ t, i18n }: Props) => {
  const classes = useStyles()
  const [race, setRace] = useState<Race | null>(null)
  const [clan, setClan] = useState<Clan | null>(null)
  const [gender, setGender] = useState<Gender | null>(null)
  const [results, setResults] = useState<string[]>(['Click the Generate button!'])
  const locale = i18n.language

  const raceClans = race ? getClans(race) : []
  const raceGenders = race ? getGenders(race) : []
  const AdvancedComponent = clan && gender && ADVANCED[`${clan},${gender}`]

  const handleSelectRace = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const race = event.target.value === 'none' ? null : event.target.value as Race
    const raceClans = race && getClans(race)
    const raceGenders = race && getGenders(race)
    setRace(race)
    setClan(race && raceClans.length === 1 ? raceClans[0] : null)
    setGender(race && raceGenders.length === 1 ? raceGenders[0] : null)
  }
  const handleSelectClan = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const clan = event.target.value
    setClan(clan === 'none' ? null : clan as Clan)
  }
  const handleSelectGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const gender = event.target.value
    setGender(gender === 'none' ? null : gender as Gender)
  }

  const handleClickGenerate = () => {
    const newResults = []
    for (let i = 0; i < 10; ++i) {
      const genRace = race || randomElement(RACES)
      const genClan = clan || randomElement(getClans(genRace))
      const genGender = gender || randomElement(getGenders(genRace))
      newResults.push(generate(genRace, genClan, genGender))
    }
    setResults(newResults)
  }

  return (
    <>
      <Section>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>{t('race')}</InputLabel>
              <Select value={race || 'none'} onChange={handleSelectRace}>
                <MenuItem value='none'>{t('anyRace')}</MenuItem>
                {RACES.map(race =>
                  <MenuItem key={race} value={race}>{translate('race', race, locale)}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>{t('clan')}</InputLabel>
              <Select value={clan || 'none'} onChange={handleSelectClan}>
                {raceClans.length !== 1 && <MenuItem value='none'>{t('anyClan')}</MenuItem>}
                {raceClans.map(clan =>
                  <MenuItem key={clan} value={clan}>
                    {translate('clan', clan, locale)}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>{t('gender')}</InputLabel>
              <Select value={gender || 'none'} onChange={handleSelectGender}>
                {raceGenders.length !== 1 && <MenuItem value='none'>{t('anyGender')}</MenuItem>}
                {raceGenders.map(gender =>
                  <MenuItem key={gender} value={gender}>
                    {translate('gender', gender, locale)}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button variant='contained' color='primary' fullWidth onClick={handleClickGenerate}>{t('generate')}</Button>
          </Grid>
        </Grid>
        <Paper variant='outlined' className={classes.results}>
          {results.map((result, index) => <span key={index}>{result}</span>)}
        </Paper>
      </Section>
      {AdvancedComponent && <AdvancedComponent />}
    </>
  )
}

export default i18n.withTranslation('name-generator')(Generator)
