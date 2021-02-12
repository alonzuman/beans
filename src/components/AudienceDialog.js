import { DialogContent, Divider, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Avatar from './Avatar'
import AvatarAndInfo from './AvatarAndInfo'
import Dialog from './Dialog'

export default function AudienceDialog({ open, onClose, audience }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    Promise.all(audience.map(user => {
      db.collection('users').doc(user.id).onSnapshot(snapshot => {
        const userData = {
          id: snapshot.id,
          ...snapshot.data()
        }
        setUsers([...users, userData])

      })
    }))
  }, [audience])

  return (
    <Dialog maxWidth='sm' fullWidth title={`Audience (${audience?.length})`} open={open} onClose={onClose}>
      {users?.map(({ id, avatar, name, username }) => (
        <>
          <ListItem key={id} button>
            <ListItemAvatar>
              <Avatar src={avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={username}
            />
          </ListItem>
          <Divider />
        </>
      ))}
    </Dialog>
  )
}
