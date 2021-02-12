import { Box, Typography } from '@material-ui/core'
import React from 'react'
import Avatar from './Avatar'

export default function AvatarAndInfo({ avatar, title, subtitle }) {
  return (
    <Box display='flex' alignItems='center'>
      <Box marginRight={1}>
        <Avatar src={avatar} />
      </Box>
      <Box>
        {title && <Typography style={{ lineHeight: 1 }} variant='body1'>{title}</Typography>}
        {subtitle && <Typography variant='body2' color='textSecondary'>{subtitle}</Typography>}
      </Box>
    </Box>
  )
}
