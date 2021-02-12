import { Box, useTheme } from '@material-ui/core'
import React from 'react'

export default function Footer({ children }) {
  const { palette } = useTheme()

  return (
    <Box position='fixed' bottom={0} right={0} left={0} bgcolor={palette.background.default} py={1} px={3} borderTop={`1px solid ${palette.grey[300]}`}>
      {children}
    </Box>
  )
}
