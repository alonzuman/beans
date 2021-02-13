import { Button, Container, Typography } from '@material-ui/core'
import React from 'react'
import Avatar from '../components/Avatar'
import { useUser } from '../contexts/UserProvider'
import { auth } from '../firebase'

export default function Profile() {
  const user = useUser()
  const { name = '', username = '', phoneNumber = '', email = '', avatar = '' } = user;

  return (
    <Container maxWidth='md'>
      <Typography variant='h1'>{name}</Typography>
      <Typography variant='h4'>{username}</Typography>
      <Typography variant='h4'>{phoneNumber}</Typography>
      <Avatar src={avatar} />
      <Button onClick={() => auth.signOut()} variant='outlined' color='primary' size='large'>Sign Out</Button>
    </Container>
  )
}
