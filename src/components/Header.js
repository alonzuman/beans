import { Box, Button, useTheme } from '@material-ui/core'
import React, { lazy, Suspense, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../contexts/UserProvider'
import Logo from './Logo'
import SignUpDialog from './SignUpDialog'

const CreateEventDialog = lazy(() => import('./CreateEventDialog'))

export default function Header() {
  const { palette } = useTheme()
  const { id = '' } = useUser()
  const [isCreating, setIsCreating] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)

  const toggleCreating = () => setIsCreating(!isCreating)
  const toggleSigningIn = () => setIsSigningIn(!isSigningIn)

  return (
    <>
      {isCreating && (
        <Suspense fallback={null}>
          <CreateEventDialog onClose={toggleCreating} />
        </Suspense>
      )}
      {isSigningIn && (
        <Suspense fallback={null}>
          <SignUpDialog open onClose={toggleSigningIn} />
        </Suspense>
      )}
      <Box
        justifyContent='space-between'
        alignItems='center'
        display='flex'
        zIndex={9}
        position='sticky'
        top={0}
        py={1}
        px={3}
        width='100%'
        bgcolor={palette.background.default}
        borderBottom={`1px solid ${palette.grey[300]}`}
      >
        <Link style={{ lineHeight: 1 }} to='/'>
          <Logo color={palette.primary.main} />
        </Link>
        <Box>
          {id ? (
            <Link to='/me'>
              <Button size='large' style={{ marginRight: 16 }} color='primary'>Profile</Button>
            </Link>
          ) : (
              <Button onClick={toggleSigningIn} size='large' style={{ marginRight: 16 }} color='primary'>Sign In</Button>
            )}
          <Button onClick={toggleCreating} color='primary' variant='contained' size='large'>Create</Button>
        </Box>
      </Box>
    </>
  )
}
