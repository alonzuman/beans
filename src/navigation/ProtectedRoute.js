import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useUser } from '../contexts/UserProvider'

export default function ProtectedRoute({ component: Component, ...rest }) {
  const user = useUser()

  return (
    <Route
      render={(props) => (
        !!user?.id ? <Component {...props} {...rest} /> : <Redirect to='/' />
      )}
    />
  )
}
