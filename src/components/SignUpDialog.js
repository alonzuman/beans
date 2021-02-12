import { DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import SignUp from '../forms/SignUp'
import Dialog from './Dialog'

export default function SignUpDialog({ onClose, open }) {
  return (
    <Dialog maxWidth='xs' fullWidth open={open} onClose={onClose} title='Sign up'>
      <DialogContent>
        <SignUp />
      </DialogContent>
    </Dialog>
  )
}
