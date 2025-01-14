import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import { ChecklistContext } from './index'
import Page from '../../src/Page'
import Section from '../../src/Section'
import NavigationBar from '../../src/ocean-fishing/NavigationBar'
import ImportFishes from '../../src/ocean-fishing/ImportFishes'
import FishTable from '../../src/ocean-fishing/FishTable'
import { fishingSpots } from '../../src/ocean-fishing/ffxiv-ocean-fishing/data'
import translate from '../../src/translate'
import { useTranslation } from '../../src/i18n'

const Fish = (): React.ReactElement => {
  const { t, i18n } = useTranslation('ocean-fishing')
  const [checklist, setChecklist] = useState<number[]>([])
  const [showImport, setShowImport] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = window.localStorage.getItem('ocean-fishing/checklist')
      if (data !== null) {
        setChecklist(data.split(',').map(x => Number(x) | 0).filter(x => x))
      }
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('ocean-fishing/checklist', checklist.join(','))
  }, [checklist])

  const toggleShowImport = (): void => {
    setShowImport(!showImport)
  }

  return (
    <Page title={[t('_title'), t('fishPage._title')]}>
      <NavigationBar page='/fish' />
      <ChecklistContext.Provider value={{ checklist, setChecklist }}>
        <Section>
          <Typography paragraph>
            Data are taken from the <Link href='https://docs.google.com/spreadsheets/d/1brCfvmSdYl7RcY9lkgm_ds8uaFqq7qaxOOz-5BfHuuk/edit?usp=sharing'>Ocean Fishing Spreadsheet</Link> managed by S’yahn Tia. Bite times are from <Link href='https://ffxivteamcraft.com/'>Teamcraft</Link> when available. For questions/comments/corrections, please visit the <Link href='https://discord.gg/AnFaDpN'>Fisherman’s Horizon Discord</Link> or message Lulu Pillow@Adamantoise or Pillowfication#0538.
          </Typography>
          <Button variant='contained' onClick={toggleShowImport}>Import Fishes</Button>
        </Section>
        <Collapse in={showImport}>
          <Section>
            <ImportFishes checklist={checklist} setChecklist={setChecklist} />
          </Section>
        </Collapse>
        {Object.values(fishingSpots)
          .filter(fishingSpot => fishingSpot.id !== 0)
          .sort((a, b) => a.order - b.order)
          .map(fishingSpot =>
            <Section key={fishingSpot.id} title={translate(i18n.language, fishingSpot.placeName, 'name')}>
              <FishTable fishingSpots={[fishingSpot]} />
            </Section>
          )}
      </ChecklistContext.Provider>
    </Page>
  )
}

Fish.getInitialProps = async () => ({
  namespacesRequired: ['common', 'ocean-fishing']
})

export default Fish
