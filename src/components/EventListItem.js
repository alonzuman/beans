import { Box, Card, Grid, Typography, useTheme } from '@material-ui/core'
import React from 'react'
import Avatar from './Avatar'
import { format } from 'date-fns'

export default function EventListItem({ title, members, hero, scheduledAt }) {
  const { palette } = useTheme()

  return (
    <Card style={{ position: 'relative', backgroundImage: `url(${hero})` }}>
      <Box
        py={1}
        px={2}
        zIndex={9}
        height={244}
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5032387955182073) 100%)'
        }}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Box justifyContent='center' borderRadius={12} display='flex' flexDirection='column' px={2} py={1} alignItems='center' alignSelf='flex-end' bgcolor={palette.background.paper}>
          <Typography variant='h3'>{format(new Date(scheduledAt), 'dd')}</Typography>
          <Typography variant='body1'>{format(new Date(scheduledAt), 'MMM')}</Typography>
        </Box>
        <Box>
          <Grid container>
            {members?.map(({ name, avatar }, index) => (
              <Grid key={name} item style={{ marginLeft: index === 0 ? 0 : -8 }}>
                <Avatar src={avatar} />
              </Grid>
            ))}
          </Grid>
          <Typography style={{ color: '#fff' }} variant='h3'>{title}</Typography>
        </Box>
      </Box>
    </Card>
  )
}
