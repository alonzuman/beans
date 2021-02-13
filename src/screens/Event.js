import { Box, Button, Container, IconButton, Link, Typography, useTheme } from '@material-ui/core'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import AvatarAndInfo from '../components/AvatarAndInfo'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import { useUser } from '../contexts/UserProvider'
import { db } from '../firebase'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Splash from './Splash'
import { useHistory } from 'react-router-dom'

const SignUpDialog = lazy(() => import('../components/SignUpDialog'))
const AudienceDialog = lazy(() => import('../components/AudienceDialog'))

export default function Event({ match }) {
  const { palette } = useTheme()
  const { goBack } = useHistory()
  const { spacing } = useTheme()
  const { eventID } = match.params
  const user = useUser()
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [isShowingAudience, setIsShowingAudience] = useState(false)
  const [event, setEvent] = useState(null)
  const [audience, setAudience] = useState([])
  const [isJoined, setIsJoined] = useState(false)

  useEffect(() => {
    if (eventID) {
      Promise.all([
        // Get event meta
        db.collection('events').doc(eventID).get().then(snapshot => {
          setEvent({
            id: snapshot.id,
            ...snapshot.data()
          })
        }),
        // Get audience
        db.collection('events').doc(eventID).collection('audience').onSnapshot(snapshot => {
          const data = snapshot.docs.map(doc => {
            if (doc.id === user?.id) {
              setIsJoined(true)
            }

            return {
              id: doc.id,
              ...doc.data()
            }
          })

          setAudience(data)
        })
      ])
        .catch(err => console.log(err))
    }
  }, [])

  const handleClick = async () => {
    if (user?.id) {
      // If joined already
      const snapshot = await db.collection('events').doc(eventID).collection('audience').doc(user.id).get()
      if (snapshot.exists) {
        setIsJoined(false)
        db.collection('events').doc(eventID).collection('audience').doc(user.id).delete()
      } else {
        setIsJoined(true)
        db
          .collection('events')
          .doc(eventID)
          .collection('audience')
          .doc(user.id)
          .set(user, { merge: true })
      }
    } else {
      toggleSigningUp()
    }
  }

  const toggleSigningUp = () => setIsSigningUp(!isSigningUp)
  const toggleAudience = () => setIsShowingAudience(!isShowingAudience)

  if (!event) return <Splash />

  return (
    <>
      {isSigningUp && (
        <Suspense fallback={null}>
          <SignUpDialog open onClose={toggleSigningUp} />
        </Suspense>
      )}
      {isShowingAudience && (
        <Suspense fallback={null}>
          <AudienceDialog open onClose={toggleAudience} audience={audience} />
        </Suspense>
      )}
      <Container maxWidth='md' disableGutters style={{ marginBottom: spacing(12), position: 'relative' }}>
        <IconButton style={{ zIndex: 1, position: 'absolute', top: 16, left: 16, backgroundColor: palette.background.paper }} onClick={goBack}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Hero src={event?.hero} />
        <Box px={3} py={3}>
          <Typography variant='h1'>{event?.title}</Typography>
          <Typography onClick={toggleAudience} style={{ cursor: 'pointer' }} variant='body1' color='textSecondary'>{audience?.length}{audience?.length === 1 ? ' Participant' : ' Participants'}</Typography>
          <Box my={2}>
            {event?.hosts?.map(({ avatar, name }) => (
              <AvatarAndInfo key={avatar} avatar={avatar} title={name} subtitle='Host' />
            ))}
            {event?.guests?.map(({ avatar, name }) => (
              <AvatarAndInfo key={avatar} avatar={avatar} title={name} subtitle='Guest' />
            ))}
          </Box>
          <Box my={2}>
            <Typography style={{ marginBottom: 8 }} variant='h3'>About</Typography>
            <Typography variant='body1'>{event?.description}</Typography>
          </Box>
        </Box>
        <Footer>
          <Button onClick={handleClick} size='large' color='primary' variant='contained' fullWidth>{isJoined ? "Joined!" : "Join ✌️"}</Button>
        </Footer>
      </Container>
    </>
  )
}
