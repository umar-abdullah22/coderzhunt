/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable-next-line no-unused-vars*/
import { createContext, useContext, useState } from 'react'
import { useLocalStorage } from 'react-use'
const UserContext = createContext()
export const UserProvider = (props) => {

  const [token, setToken] = useLocalStorage('token', null);
  const [loggedInUser, setLoggedInUser] = useLocalStorage('user', null);
  const value = {
    token,
    setToken,
    loggedInUser,
    setLoggedInUser
  }
  return (
    <>
      <UserContext.Provider value={value} {...props} />
    </>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}