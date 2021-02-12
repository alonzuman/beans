import { Box, CircularProgress } from '@material-ui/core'
import React from 'react'

export default function Splash() {
  return (
    <Box display='flex' alignItems='center' justifyContent='center' position='fixed' top={0} right={0} left={0} bottom={0}>
      <CircularProgress />
    </Box>
  )
}
