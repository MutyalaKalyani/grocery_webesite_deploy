import React,{createContext,useState} from 'react'

export const store=createContext();
const ContextProvider = ({children}) => {
    const [user,setUser]=useState([]);
    const [cart,setCart]=useState([])

  return (
    <store.Provider value={{user,setUser,cart,setCart}}>
        {children}
    </store.Provider>
  )
}

export default ContextProvider