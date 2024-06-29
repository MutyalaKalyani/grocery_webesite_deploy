
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './components/Signup.jsx'
import Signin from './components/Signin.jsx'
import Home from './components/Home.jsx'
import Nav from './components/Nav.jsx'
import Orders from './components/Orders'
import Profile from './components/Profile'
import ContextProvider from './ContextProvider.jsx'
import Item from './components/Item.jsx'
import LandingScreen from './components/LandingScreen.jsx'
import Cart from './components/Cart.jsx'
import Cancel from './components/Cancel.jsx'
import Success from './components/Success.jsx'
import Admin from './components/Admin.jsx'
const App=()=> {
  return (
    
    <ContextProvider>
     <BrowserRouter>
   <Nav/>
      <Routes>
        <Route path='/' element={<LandingScreen/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/login' element={<Signin/>}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/products/:name' element={<Item/>}/>
        <Route path='/orders' element={<Orders />}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/cancel' element={<Cancel/>}/>
        <Route path='/admin' element={<Admin/>}/>

      </Routes>
    </BrowserRouter>
      </ContextProvider>
  )
}

export default App
