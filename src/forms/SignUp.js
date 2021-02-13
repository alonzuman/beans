import { Box, Button, TextField, Typography, useTheme } from '@material-ui/core'
import React, { useState } from 'react'
import PhoneNumberInput from '../components/PhoneNumberInput'
import PhoneVerification from './PhoneVerification';
import firebase from 'firebase'

export default function SignUp({ onClose }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('')
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [token, setToken] = useState('')

  const sendCode = e => {
    e.preventDefault()

    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        setToken(response)
      }
    });

    console.log('+972' + phoneNumber)
    firebase
      .auth()
      .signInWithPhoneNumber('+972' + phoneNumber, appVerifier)
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
      if (res && onClose) return onClose()
    })
  }

  return (
    <>
      <div id="recaptcha-container"></div>
      <Box>
        {!token ? (
          <>
            <PhoneVerification value={phoneNumber} onChange={setPhoneNumber} />
            <Button color='primary' variant='outlined' size='large' style={{ marginTop: 16 }} onClick={sendCode}>Send code</Button>
          </>
        ) : (
            <>
              <TextField
                value={code}
                onChange={e => setCode(e.target.value)}
                label='Confirmation code'
                fullWidth
                variant='outlined'
                margin='normal'
              />
              <Button color='primary' variant='outlined' size='large' style={{ marginTop: 16 }} onClick={approveCode}>Approve code</Button>
            </>
          )}
      </Box>
    </>
  )
}
