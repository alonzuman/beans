import { Box, Card, Grid, Typography } from '@material-ui/core'
import React from 'react'
import Avatar from './Avatar'

export default function EventListItem({ title, description, members, id, hero }) {
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
        justifyContent='flex-end'
        >
        <Grid container>
          {members?.map(({ name, avatar }, index) => (
            <Grid item style={{ marginLeft: index === 0 ? 0 : -8 }}>
              <Avatar src={avatar} />
            </Grid>
          ))}
        </Grid>
        <Typography style={{ color: '#fff' }} variant='h3'>{title}</Typography>
      </Box>
    </Card>
  )
}
