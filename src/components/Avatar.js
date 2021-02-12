import { makeStyles } from '@material-ui/core'
import React from 'react'

export default function Avatar({ src = '', size = 40 }) {
  const useStyles = makeStyles(({ palette }) => ({
    root: {
      height: size,
      width: size,
      borderRadius: size / 2.4,
      objectFit: 'cover',
      border: `2px solid ${palette.grey[100]}`
    }
  }))

  const classes = useStyles()

  if (!src) return null
  return (
    <img src={src} className={classes.root} />
  )
}
