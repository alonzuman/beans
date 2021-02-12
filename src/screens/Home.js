import { Box, Container, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EventListItem from '../components/EventListItem'
import { db } from '../firebase'
import Splash from './Splash'

export default function Home() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    db.collection('events').get()
      .then(snapshot => {
        setEvents(snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  if (!events) return <Splash />

  return (
    <Container maxWidth='md'>
      <Typography style={{ marginBottom: 16, marginTop: 16 }} variant='h1'>Upcoming</Typography>
      <Grid container spacing={2}>
        {events?.map(({ id, title, hero, scheduledAt, hosts = [], guests = [] }) => (
          <Grid key={id} item lg={6} md={6} sm={12} xs={12}>
            <Link to={`/events/${id}`}>
              <EventListItem
                title={title}
                hero={hero}
                scheduledAt={scheduledAt}
                members={[...hosts, ...guests]}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
