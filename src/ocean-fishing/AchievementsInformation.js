import React from 'react'
import PropTypes from 'prop-types'
import { DEST_MAP, TIME_MAP, ACHIEVEMENTS_MAP } from './maps'
import BAIT_GROUPS from './bait-groups'
import { makeStyles } from '@material-ui/core/styles'
import Section from '../Section'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Highlight from '../Highlight'
import RouteCardContainer from './RouteCardContainer'
import RouteCard from './RouteCard'
import BaitList from './BaitList'
import OceanFishIcon from './OceanFishIcon'
import Tug from './Tug'
import { getStops } from './utils'
import jellyfishMacro from './macros/jellyfish.ffmacro'
import seadragonsMacro from './macros/seadragons.ffmacro'
import octopodesMacro from './macros/octopodes.ffmacro'

const useStyles = makeStyles((theme) => ({
  achievementInfo: {
    marginBottom: theme.spacing(2)
  },
  achievementIcon: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: '0.5em',
    fontSize: '0.65em',
    verticalAlign: 'sub'
  },
  headerSub: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      display: 'block'
    }
  }
}))

const AchievementsInformation = ({ selectedRoute }) => {
  if (!selectedRoute) return null

  const classes = useStyles()
  const achievement = selectedRoute && ACHIEVEMENTS_MAP[selectedRoute]
  const stops = getStops(selectedRoute)

  switch (achievement) {
    case 'What Did Octopodes Do to You?':
      return (
        <Section
          title={
            <>
              Octopodes Route
              <OceanFishIcon name={achievement} className={classes.achievementIcon} />
              <Typography display='inline' className={classes.headerSub}>
                catch 150 octopodes (18.75 each)
              </Typography>
            </>
          }
        >
          <RouteCardContainer className={classes.achievementInfo}>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>1. {DEST_MAP[stops[0][0]]} {TIME_MAP[stops[0][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <Typography paragraph>
                  No octopodes here.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>2. {DEST_MAP[stops[1][0]]} {TIME_MAP[stops[1][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'IC–DH at 16-28s',
                    baitGroup: BAIT_GROUPS['Cyan Octopus']
                  }, {
                    header: 'DH–IC–DH at <3s',
                    baitGroup: BAIT_GROUPS['Merman\'s Mane']
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Non-spectral</Typography>
                <Typography paragraph>
                  Can blind DH the Cyan Octopodes at 25s, or at 19s with a SS’d Jasperhead.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  Only the instant <Tug.Medium /> is Merman’s Mane; any later is not.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>3. {DEST_MAP[stops[2][0]]} {TIME_MAP[stops[2][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'DH–IC–DH at 4s',
                    baitGroup: BAIT_GROUPS.Mopbeard
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  The earlier <Tug.Medium /> is Coccosteus.
                </Typography>
              </CardContent>
            </RouteCard>
          </RouteCardContainer>
          <Typography paragraph>
            Sample octopodes macro
          </Typography>
          <Highlight language='plaintext'>
            {octopodesMacro}
          </Highlight>
        </Section>
      )
    case 'What Did Sharks Do to You?':
      return (
        <Section
          title={
            <>
              Sharks Route
              <OceanFishIcon name={achievement} className={classes.achievementIcon} />
              <Typography display='inline' className={classes.headerSub}>
                catch 200 sharks (25 each)
              </Typography>
            </>
          }
        >
          <RouteCardContainer className={classes.achievementInfo}>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>1. {DEST_MAP[stops[0][0]]} {TIME_MAP[stops[0][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'IC; DH–IC–DH post-spectral',
                    baitGroup: BAIT_GROUPS['Tarnished Shark']
                  }, {
                    header: 'IC–DH',
                    baitGroup: BAIT_GROUPS['Ghost Shark']
                  }, {
                    header: 'No buffs',
                    baitGroup: BAIT_GROUPS['Quicksilver Blade']
                  }, {
                    header: 'DH–IC–DH',
                    baitGroup: BAIT_GROUPS['Funnel Shark']
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Pre-spectral</Typography>
                <Typography paragraph>
                  Save GP when possible; IC if capped.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  Hook any <Tug.Medium /> and <Tug.Heavy />. IC–DH if you catch a Ghost Shark; <Tug.Heavy /> is a blind DH–IC–DH.
                </Typography>
                <Typography variant='overline'>Post-spectral</Typography>
                <Typography paragraph>
                  Spend all remaining GP with blind DH–IC–DH Tarnished Sharks.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>2. {DEST_MAP[stops[1][0]]} {TIME_MAP[stops[1][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <Typography paragraph>
                  No sharks here.
                </Typography>
                <Typography paragraph>
                  Try for Coral Manta?<br />(but save GP)
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>3. {DEST_MAP[stops[2][0]]} {TIME_MAP[stops[2][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'IC–DH; DH–IC–DH post-spectral',
                    baitGroup: BAIT_GROUPS['Chrome Hammerhead']
                  }, {
                    header: 'No buffs',
                    baitGroup: BAIT_GROUPS.Sweeper
                  }, {
                    header: 'DH–IC–DH',
                    baitGroup: BAIT_GROUPS.Executioner
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Pre-spectral</Typography>
                <Typography paragraph>
                  Can’t blind DH Chrome Hammerheads.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  Hook <Tug.Medium /> and <Tug.Heavy />. If you catch a Sweeper, can use IC if high on GP. <Tug.Heavy /> is a blind DH.
                </Typography>
                <Typography variant='overline'>Post-spectral</Typography>
                <Typography paragraph>
                  Can blind DH Chrome Hammerheads.
                </Typography>
              </CardContent>
            </RouteCard>
          </RouteCardContainer>
        </Section>
      )
    case 'What Did Jellyfish Do to You?':
      return (
        <Section
          title={
            <>
              Jellyfish Route
              <OceanFishIcon name={achievement} className={classes.achievementIcon} />
              <Typography display='inline' className={classes.headerSub}>
                catch 150 jellyfish (18.75 each)
              </Typography>
            </>
          }
        >
          <RouteCardContainer className={classes.achievementInfo}>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>1. {DEST_MAP[stops[0][0]]} {TIME_MAP[stops[0][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <Typography paragraph>
                  No jellyfish here.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>2. {DEST_MAP[stops[1][0]]} {TIME_MAP[stops[1][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'DH at <5s',
                    baitGroup: BAIT_GROUPS['La Noscean Jelly']
                  }, {
                    header: 'IC–DH',
                    baitGroup: BAIT_GROUPS['Sea Nettle']
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Non-spectral</Typography>
                <Typography paragraph>
                  Blind DH all <Tug.Light /> before 5s, and recast after 5s. IC is not necessary.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  While spectral is not recommended, it won’t kill your run.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>3. {DEST_MAP[stops[2][0]]} {TIME_MAP[stops[2][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'IC–DH',
                    baitGroup: BAIT_GROUPS['Floating Saucer']
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  Nothing to say about this.
                </Typography>
              </CardContent>
            </RouteCard>
          </RouteCardContainer>
          <Typography paragraph>
            Sample jellyfish macro
          </Typography>
          <Highlight language='plaintext'>
            {jellyfishMacro}
          </Highlight>
        </Section>
      )
    case 'What Did Seadragons Do to You?':
      return (
        <Section
          title={
            <>
              Seadragons Route
              <OceanFishIcon name={achievement} className={classes.achievementIcon} />
              <Typography display='inline' className={classes.headerSub}>
                catch 100 seadragons (12.5 each)
              </Typography>
            </>
          }
        >
          <RouteCardContainer className={classes.achievementInfo}>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>1. {DEST_MAP[stops[0][0]]} {TIME_MAP[stops[0][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'IC–DH at 10-18s',
                    baitGroup: BAIT_GROUPS['Shaggy Seadragon']
                  }, {
                    header: 'No buffs',
                    baitGroup: BAIT_GROUPS['Aetheric Seadragon']
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Non-spectral</Typography>
                <Typography paragraph>
                  There’s possibly a blind DH at 14-17s.
                </Typography>
                <Typography paragraph>
                  Clouds and Fog weather will remove Shaggy Seadragons.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  Spectral is bad. Sit on IC if you have it going into spectral, instead of catching Aetheric Seadragons.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>2. {DEST_MAP[stops[1][0]]} {TIME_MAP[stops[1][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <Typography paragraph>
                  No seadragons here.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>3. {DEST_MAP[stops[2][0]]} {TIME_MAP[stops[2][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'IC–DH',
                    baitGroup: BAIT_GROUPS['Coral Seadragon']
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  Nothing to say about this.
                </Typography>
              </CardContent>
            </RouteCard>
          </RouteCardContainer>
          <Typography paragraph>
            Sample seadragons macro
          </Typography>
          <Highlight language='plaintext'>
            {seadragonsMacro}
          </Highlight>
        </Section>
      )
    case 'What Did Balloons Do to You?':
      return (
        <Section
          title={
            <>
              Balloons Route
              <OceanFishIcon name={achievement} className={classes.achievementIcon} />
              <Typography display='inline' className={classes.headerSub}>
                catch 250 balloons (31.25 each)
              </Typography>
            </>
          }
        >
          <RouteCardContainer className={classes.achievementInfo}>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>1. {DEST_MAP[stops[0][0]]} {TIME_MAP[stops[0][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'IC–DH',
                    baitGroup: BAIT_GROUPS['Metallic Boxfish']
                  }, {
                    header: 'DH at <5s',
                    baitGroup: BAIT_GROUPS['Mythril Boxfish']
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Non-spectral</Typography>
                <Typography paragraph>
                  In general, IC–DH when possible and don’t rely heavily on spectrals.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  Anomalocaris Saron appears at 5s.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>2. {DEST_MAP[stops[1][0]]} {TIME_MAP[stops[1][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'IC–DH',
                    baitGroup: BAIT_GROUPS.Lampfish
                  }, {
                    header: 'IC–DH',
                    baitGroup: BAIT_GROUPS.Silencer
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography paragraph>
                  You may opt for no spectral here for an extended one in the next zone.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>3. {DEST_MAP[stops[2][0]]} {TIME_MAP[stops[2][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'No buffs',
                    baitGroup: BAIT_GROUPS['Crow Puffer']
                  }, {
                    header: 'DH at >12s',
                    baitGroup: BAIT_GROUPS['Honeycomb Fish']
                  }, {
                    header: 'IC–DH',
                    baitGroup: BAIT_GROUPS['Garum Jug']
                  }, {
                    header: 'IC–DH',
                    baitGroup: BAIT_GROUPS['Pearl Bombfish']
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Non-spectral</Typography>
                <Typography paragraph>
                  Save GP when possible to blind DH Honeycomb Fish after 12s.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  Don’t blind DH.
                </Typography>
              </CardContent>
            </RouteCard>
          </RouteCardContainer>
        </Section>
      )
    case 'What Did Crabs Do to You?':
      return (
        <Section
          title={
            <>
              Crabs Route
              <OceanFishIcon name={achievement} className={classes.achievementIcon} />
              <Typography display='inline' className={classes.headerSub}>
                catch 250 crabs (31.25 each)
              </Typography>
            </>
          }
        >
          <RouteCardContainer className={classes.achievementInfo}>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>1. {DEST_MAP[stops[0][0]]} {TIME_MAP[stops[0][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'DH at <14s',
                    baitGroup: BAIT_GROUPS['Tortoiseshell Crab']
                  }, {
                    header: 'DH–IC–DH at <4s',
                    baitGroup: BAIT_GROUPS['Titanshell Crab']
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Non-spectral</Typography>
                <Typography paragraph>
                  In general, IC–DH when possible and don’t rely heavily on spectrals. Tortoiseshell Crab can be blind DH before 14s.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  Hook all <Tug.Medium />, but only the instant <Tug.Medium /> is a blind DH. Mistbeard's Cup appears at 4s.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>2. {DEST_MAP[stops[1][0]]} {TIME_MAP[stops[1][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'IC–DH',
                    baitGroup: BAIT_GROUPS['Net Crawler']
                  }, {
                    header: 'IC–DH',
                    baitGroup: BAIT_GROUPS['Bartholomew the Chopper']
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography paragraph>
                  You may opt for no spectral here for an extended one in the next zone.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>3. {DEST_MAP[stops[2][0]]} {TIME_MAP[stops[2][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'No buffs',
                    baitGroup: BAIT_GROUPS['Thaliak Crab']
                  }, {
                    header: 'DH at >15s',
                    baitGroup: BAIT_GROUPS['Bloodpolish Crab']
                  }, {
                    header: 'No Buffs',
                    baitGroup: BAIT_GROUPS['Oracular Crab']
                  }, {
                    header: 'DH at 6s',
                    baitGroup: BAIT_GROUPS.Exterminator
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Non-spectral</Typography>
                <Typography paragraph>
                  Save GP when possible to blind DH Bloodpolish Crabs after 15s.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  Can blind DH Exterminators at 6s.
                </Typography>
              </CardContent>
            </RouteCard>
          </RouteCardContainer>
        </Section>
      )
    case 'What Did Mantas Do to You?':
      return (
        <Section
          title={
            <>
              Mantas Route
              <OceanFishIcon name={achievement} className={classes.achievementIcon} />
              <Typography display='inline' className={classes.headerSub}>
                catch 25 mantas (solo)
              </Typography>
            </>
          }
        >
          <RouteCardContainer className={classes.achievementInfo}>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>1. {DEST_MAP[stops[0][0]]} {TIME_MAP[stops[0][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'IC; IC–DH post-spectral',
                    baitGroup: BAIT_GROUPS['Goobbue Ray']
                  }, {
                    header: 'DH at <6s',
                    baitGroup: BAIT_GROUPS['Jetborne Manta']
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Non-spectral</Typography>
                <Typography paragraph>
                  IC if capped, but save GP for spectral current. Possible blind DH at &gt;15s.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  Reel all <Tug.Heavy />. Callichthyid appears at 6s.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>2. {DEST_MAP[stops[1][0]]} {TIME_MAP[stops[1][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <Typography paragraph>
                  No mantas here.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>3. {DEST_MAP[stops[2][0]]} {TIME_MAP[stops[2][1]]}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'DH at >6s',
                    baitGroup: BAIT_GROUPS.Skaldminni
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  Reel all <Tug.Medium />. Beatific Vision and Gory Tuna go away at 5s.
                </Typography>
              </CardContent>
            </RouteCard>
          </RouteCardContainer>
        </Section>
      )
    default:
      return null
  }
}

AchievementsInformation.propTypes = {
  selectedRoute: PropTypes.oneOf(['BD', 'BN', 'BS', 'ND', 'NN', 'NS', 'RD', 'RN', 'RS', 'TD', 'TN', 'TS'])
}

export default AchievementsInformation
