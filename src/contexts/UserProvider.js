import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase';
import Splash from '../screens/Splash';

const UserContext = createContext(null);
export const useUser = () => useContext(UserContext)

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser)
      } else {
        // TODO anonymous sign in
      }
      setIsLoading(false)
    })

    return () => subscriber;
  }, [])

  return (
    <UserContext.Provider value={user}>
      {isLoading && <Splash />}
      {!isLoading && children}
    </UserContext.Provider>
  )
}
