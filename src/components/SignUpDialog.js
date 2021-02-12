import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import SignUp from '../forms/SignUp'

export default function SignUpDialog({ onClose, open }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <SignUp />
      </DialogContent>
    </Dialog>
  )
}
