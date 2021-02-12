import { Box, Button, Container, Dialog, IconButton, Typography, useTheme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AvatarAndInfo from '../components/AvatarAndInfo'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import SignUpDialog from '../components/SignUpDialog'
import { useUser } from '../contexts/UserProvider'
import { db } from '../firebase'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Splash from './Splash'
import { useHistory } from 'react-router-dom'

export default function Event({ match }) {
  const [isSigningUp, setIsSigningUp] = useState(false)
  const { palette } = useTheme()
  const { goBack } = useHistory()
  const { spacing } = useTheme()
  const { eventID } = match.params
  const user = useUser()
  const [event, setEvent] = useState(null)

  useEffect(() => {
    if (eventID) {
      db.collection('events').doc(eventID).get()
        .then(snapshot => {
          setEvent({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [])

  const handleClick = () => {
    if (user) {
      // TODO sign user up for event
      console.log('sign him up')
    } else {
      toggleSigningUp()
    }
  }

  const toggleSigningUp = () => setIsSigningUp(!isSigningUp)

  if (!event) return <Splash />

  return (
    <>
      <SignUpDialog open={isSigningUp} onClose={toggleSigningUp} />
      <Container maxWidth='md' disableGutters style={{ marginBottom: spacing(12), position: 'relative' }}>
        <IconButton style={{ zIndex: 9, position: 'absolute', top: 16, left: 16, backgroundColor: palette.background.paper }} onClick={goBack}>
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Hero src={event?.hero} />
        <Box px={3}>
          <Typography variant='h1'>{event?.title}</Typography>
          <Box my={2}>
            {event?.hosts?.map(({ avatar, name }) => (
              <AvatarAndInfo key={avatar} avatar={avatar} title={name} subtitle='Host' />
            ))}
            {event?.guests?.map(({ avatar, name }) => (
              <AvatarAndInfo key={avatar} avatar={avatar} title={name} subtitle='Guest' />
            ))}
          </Box>
          <Box my={2}>
            <Typography variant='h3'>About</Typography>
            <Typography variant='body1'>{event?.description}</Typography>
          </Box>
        </Box>
        <Footer>
          <Button onClick={handleClick} size='large' color='primary' variant='contained' fullWidth>Join ✌️</Button>
        </Footer>
      </Container>
    </>
  )
}
