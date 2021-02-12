import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
  root: {
    height: 244,
    overflow: 'hidden',
    position: 'relative'
  },

  overlay: {
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0,0,0,0) 60%, rgba(255, 255, 255, 1) 100%)',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}))

export default function Hero({ src = '' }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.overlay} />
      <img src={src} className={classes.img} />
    </div>
  )
}
