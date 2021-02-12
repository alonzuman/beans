import { Box, useTheme } from '@material-ui/core'
import React from 'react'
import Logo from './Logo'

export default function Header() {
  const { palette } = useTheme()

  return (
    <Box
      justifyContent='center'
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
      <Logo />
    </Box>
  )
}
