import { Box, FormControl, InputBase, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'

const COUNTRY_CODES = [
  '+972',
]

export default function PhoneNumberInput({ value, onChange }) {
  const [countryCode, setCountryCode] = useState('+972')

  const handleChange = e => {
    onChange(e.target.value)
  }

  return (
    <Box display='flex' alignItems='center'>
      <FormControl variant='outlined' style={{ minWidth: 144 }}>
        <InputLabel >Country Code</InputLabel>
        <Select label='country code' fullWidth value={countryCode} onChange={e => setCountryCode(e.target.value)}>
          {COUNTRY_CODES?.map(code => <MenuItem value={code} key={code}>{code}</MenuItem>)}
        </Select>
      </FormControl>
      <Box marginLeft={1} width='100%'>
        <TextField fullWidth label='Phone number' value={value} onChange={handleChange} variant='outlined' />
      </Box>
    </Box>
  )
}
