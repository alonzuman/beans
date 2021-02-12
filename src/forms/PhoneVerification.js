import { Box, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import PhoneNumberInput from '../components/PhoneNumberInput'

export default function PhoneVerification({value, onChange, next, prev}) {

  return (
    <>
      <Box mb={2}>
        <Typography variant='body1'>Sign up and subscribe to the event</Typography>
      </Box>
      <PhoneNumberInput value={value} onChange={onChange} />
    </>
  )
}
