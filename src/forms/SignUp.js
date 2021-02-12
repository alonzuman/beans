import { Box, Button, TextField, Typography, useTheme } from '@material-ui/core'
import React, { useState } from 'react'
import PhoneNumberInput from '../components/PhoneNumberInput'
import PhoneVerification from './PhoneVerification';
import firebase from 'firebase'

export default function SignUp() {
  const { spacing } = useTheme()
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [step, setStep] = useState(0)

  const handlePhoneSubmit = e => {
    e.preventDefault()
    const user = {
      phoneNumber,
      email
    }

    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log({ response })
      }
    });

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((res) => {
        setConfirmationResult(res)
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        // ...
      }).catch((error) => {
        console.log(error)
        // Error; SMS not sent
        // ...
      });
  }

  const approveCode = () => {
    confirmationResult?.confirm(code).then(res => {
      console.log(res)
    })
  }

  return (
    <>
      <div id="recaptcha-container"></div>
      <Box>
        <PhoneVerification value={phoneNumber} onChange={setPhoneNumber} />
        <Button onClick={handlePhoneSubmit}>Send code</Button>
        <TextField
          value={code}
          onChange={e => setCode(e.target.value)}
          label='Confirmation code'
          fullWidth
          variant='outlined'
          margin='normal'
        />
        <Button onClick={approveCode}>Approve code</Button>
        <TextField
          value={email}
          onChange={e => setEmail(e.target.value)}
          label='Email'
          fullWidth
          variant='outlined'
        />
      </Box>
    </>
  )
}
