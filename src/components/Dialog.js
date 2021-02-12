import { Dialog as MaterialDialog, DialogTitle, IconButton, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import React from 'react'

export default function Dialog({ open, onClose, maxWidth = 'xs', fullWidth = false, children, title = '' }) {
  return (
    <MaterialDialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth}>
      {title && (
        <DialogTitle style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} disableTypography variant='h4'>
          <Typography variant='h4'>
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}
      {children}
    </MaterialDialog>
  )
}
