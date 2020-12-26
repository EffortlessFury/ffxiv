import React from 'react'
import PropTypes from 'prop-types'
import { DEST_MAP, TIME_MAP, ACHIEVEMENTS_MAP } from './maps'
import { makeStyles } from '@material-ui/core/styles'
import Section from '../Section'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Highlight from '../Highlight'
import RouteCardContainer from './RouteCardContainer'
import RouteCard from './RouteCard'
import BaitList from './BaitList'
import BaitGroup from './BaitGroup'
import OceanFishIcon from './OceanFishIcon'
import Tug from './Tug'
import { getStops, getBaitChain } from './utils'
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
  const achievements = selectedRoute && ACHIEVEMENTS_MAP[selectedRoute]
  const stops = getStops(selectedRoute)

  return achievements.map((achievement) =>
    <AchievementInformation
      key={achievement}
      achievement={achievement}
      stops={stops}
    />
  )
}

const AchievementInformation = ({ achievement, stops }) => {
  const classes = useStyles()

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
                <Typography paragraph>
                  You may opt for no spectral here for an extended one in the next zone.
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
                    header: 'IC–DH at 16-27s',
                    baitGroup: <BaitGroup {...getBaitChain('Cyan Octopus')} showDH />
                  }, {
                    header: 'DH–IC–DH at <3s',
                    baitGroup: <BaitGroup {...getBaitChain('Merman\'s Mane')} showDH />
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
                    header: 'DH–IC–DH at ≥5s',
                    baitGroup: <BaitGroup {...getBaitChain('Mopbeard')} showDH />
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
                    baitGroup: <BaitGroup {...getBaitChain('Tarnished Shark')} showDH />
                  }, {
                    header: 'IC–DH',
                    baitGroup: <BaitGroup {...getBaitChain('Ghost Shark')} showDH />
                  }, {
                    header: 'No buffs',
                    baitGroup: <BaitGroup {...getBaitChain('Quicksilver Blade')} showDH />
                  }, {
                    header: 'DH–IC–DH',
                    baitGroup: <BaitGroup {...getBaitChain('Funnel Shark')} showDH />
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
                  Hook <Tug.Medium /> and <Tug.Heavy />. IC–DH if you catch a Ghost Shark; <Tug.Heavy /> is a blind DH–IC–DH.
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
                    header: 'IC–DH; DH–IC–DH post-spectral',
                    baitGroup: <BaitGroup {...getBaitChain('Chrome Hammerhead')} showDH />
                  }, {
                    header: 'No buffs',
                    baitGroup: <BaitGroup {...getBaitChain('Sweeper')} showDH />
                  }, {
                    header: 'DH–IC–DH',
                    baitGroup: <BaitGroup {...getBaitChain('Executioner')} showDH />
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
                <Typography paragraph>
                  You may opt for no spectral here for an extended one in the next zone.
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
                    baitGroup: <BaitGroup {...getBaitChain('La Noscean Jelly')} showDH />
                  }, {
                    header: 'IC–DH at 4-8s',
                    baitGroup: <BaitGroup {...getBaitChain('Sea Nettle')} showDH />
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
                    header: 'IC–DH at 6-10s',
                    baitGroup: <BaitGroup {...getBaitChain('Floating Saucer')} showDH />
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  A blind DH is possible, but it can be risky and unnecessary.
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
                    header: 'IC–DH at 9-21s',
                    baitGroup: <BaitGroup {...getBaitChain('Shaggy Seadragon')} showDH />
                  }, {
                    header: 'No buffs',
                    baitGroup: <BaitGroup {...getBaitChain('Aetheric Seadragon')} showDH />
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Non-spectral</Typography>
                <Typography paragraph>
                  Clouds and Fog weather will remove Shaggy Seadragons.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  Spectral is bad. Sit on IC if you have it going into spectral instead of catching Aetheric Seadragons.
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
                    header: 'IC–DH',
                    baitGroup: <BaitGroup {...getBaitChain('Coral Seadragon')} showDH />
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
                    header: 'IC–DH at 5-10s',
                    baitGroup: <BaitGroup {...getBaitChain('Metallic Boxfish')} showDH />
                  }, {
                    header: 'DH at <5s',
                    baitGroup: <BaitGroup {...getBaitChain('Mythril Boxfish')} showDH />
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
                    header: 'IC–DH at 10-16s',
                    baitGroup: <BaitGroup {...getBaitChain('Lampfish')} showDH />
                  }, {
                    header: 'IC–DH at 2-6s',
                    baitGroup: <BaitGroup {...getBaitChain('Silencer')} showDH />
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography paragraph>
                  You may opt for no spectral here for an extended one in the next zone.
                </Typography>
                <Typography variant='overline'>Non-spectral</Typography>
                <Typography paragraph>
                  Lampfish can probably be a blind DH.
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
                    header: 'No buffs at 2-5s',
                    baitGroup: <BaitGroup {...getBaitChain('Crow Puffer')} showDH />
                  }, {
                    header: 'DH at ≥11s',
                    baitGroup: <BaitGroup {...getBaitChain('Honeycomb Fish')} showDH />
                  }, {
                    header: 'IC–DH',
                    baitGroup: <BaitGroup {...getBaitChain('Garum Jug')} showDH />
                  }, {
                    header: 'IC–DH',
                    baitGroup: <BaitGroup {...getBaitChain('Pearl Bombfish')} showDH />
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Non-spectral</Typography>
                <Typography paragraph>
                  Save GP when possible to blind DH Honeycomb Fish.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  Switch to Krill to go for both Garum Jugs and Pearl Bombfish.
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
                    header: 'IC–DH at <12s',
                    baitGroup: <BaitGroup {...getBaitChain('Tortoiseshell Crab')} showDH />
                  }, {
                    header: 'DH–IC–DH at <4s',
                    baitGroup: <BaitGroup {...getBaitChain('Titanshell Crab')} showDH />
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Non-spectral</Typography>
                <Typography paragraph>
                  In general, IC–DH when possible and don’t rely heavily on spectrals. Tortoiseshell Crab can be blind DH before 12s.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  Hook all <Tug.Medium />, but only the instant <Tug.Medium /> is a blind DH.
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
                    header: 'IC–DH at 9-21s',
                    baitGroup: <BaitGroup {...getBaitChain('Net Crawler')} showDH />
                  }, {
                    header: 'IC–DH at 4-8s',
                    baitGroup: <BaitGroup {...getBaitChain('Bartholomew the Chopper')} showDH />
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
                    header: 'No buffs at 3-7s',
                    baitGroup: <BaitGroup {...getBaitChain('Thaliak Crab')} showDH />
                  }, {
                    header: 'DH at ≥14s',
                    baitGroup: <BaitGroup {...getBaitChain('Bloodpolish Crab')} showDH />
                  }, {
                    header: 'No Buffs',
                    baitGroup: <BaitGroup {...getBaitChain('Oracular Crab')} showDH />
                  }, {
                    header: 'DH at ≥5s',
                    baitGroup: <BaitGroup {...getBaitChain('Exterminator')} showDH />
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Non-spectral</Typography>
                <Typography paragraph>
                  Save GP when possible to blind DH Bloodpolish Crabs.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  Can blind DH Exterminators at 5s.
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
                    header: 'DH; DH-IC–DH post-spectral at 12-26s',
                    baitGroup: <BaitGroup {...getBaitChain('Goobbue Ray')} showDH />
                  }, {
                    header: 'DH at <3s',
                    baitGroup: <BaitGroup {...getBaitChain('Jetborne Manta')} showDH />
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Pre-spectral</Typography>
                <Typography paragraph>
                  IC or blind DH if capped, but save GP for spectral current.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph>
                  Only the instant <Tug.Heavy /> is Jetborne Manta. Callichthyid appears at 5s.
                </Typography>
                <Typography variant='overline'>Post-spectral</Typography>
                <Typography paragraph>
                  Spend all remaining GP on mantas.
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
              {(() => {
                switch (stops[2]) {
                  case 'BN':
                    return (
                      <>
                        <CardContent>
                          <BaitList
                            baitGroups={[{
                              header: 'DH at ≥5s',
                              baitGroup: <BaitGroup {...getBaitChain('Skaldminni')} showDH />
                            }]}
                          />
                        </CardContent>
                        <CardContent>
                          <Typography variant='overline'>Spectral</Typography>
                          <Typography paragraph>
                            Reel any <Tug.Medium />. Beatific Vision and Gory Tuna go away at 5s. Go for IC–DH if it’s all you need, instead of hoping for more blind DHs.
                          </Typography>
                        </CardContent>
                      </>
                    )
                  case 'TD':
                    return (
                      <>
                        <CardContent>
                          <BaitList
                            baitGroups={[{
                              header: 'IC–DH at 4-5s',
                              baitGroup: <BaitGroup {...getBaitChain('Panoptes')} showDH />
                            }]}
                          />
                        </CardContent>
                        <CardContent>
                          <Typography variant='overline'>Spectral</Typography>
                          <Typography paragraph>
                            Reel any <Tug.Medium />. Panoptes can possibly be a blind DH (needs confirmation). Don’t mooch Rothlyt Mussels for Panoptes; recast instead.
                          </Typography>
                        </CardContent>
                      </>
                    )
                }
              })()}
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
