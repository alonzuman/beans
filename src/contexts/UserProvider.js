import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import Splash from '../screens/Splash';

const UserContext = createContext(null);
export const useUser = () => useContext(UserContext)

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        const userData = {
          name: authUser.displayName,
          phoneNumber: authUser.phoneNumber,
          email: authUser.email,
          avatar: authUser.photoURL,
          id: authUser.uid
        }

        db.collection('users').doc(userData?.id).get()
          .then(snapshot => {
            if (snapshot.exists) {
              setUser(userData)
            } else {
              db.collection('users').doc(userData?.id).set({
                ...userData,
                username: '',
                createdAt: Date.now(),
                updatedAt: Date.now()
              }, { merge: true })
                .then(() => setUser(userData))
            }
          })
          .finally(() => setIsLoading(false))
      } else {
        setUser(null)
        setIsLoading(false)
      }
    })

    return () => subscriber;
  }, [auth])

  return (
    <UserContext.Provider value={{ ...user, isLoading }}>
      {isLoading && <Splash />}
      {!isLoading && children}
    </UserContext.Provider>
  )
}
