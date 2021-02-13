import { DialogContent } from '@material-ui/core'
import React from 'react'
import CreateEvent from '../forms/CreateEvent'
import Dialog from './Dialog'

export default function CreateEventDialog({ onClose }) {
  return (
    <Dialog maxWidth='xs' fullWidth title='Create Event' open onClose={onClose}>
      <DialogContent>
        <CreateEvent />
      </DialogContent>
    </Dialog>
  )
}
