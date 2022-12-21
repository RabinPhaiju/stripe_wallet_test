import React, { createContext,useContext } from 'react'
import { Routes, Route,Link } from "react-router-dom"
import { GlobalProvider } from "./components/context/UserState";
import StripeContainer from './components/StripeContainer'
import Checkout from "./components/Checkout"
import HomePage from "./components/HomePage"
import './App.css'

const initialState = {price: 0};
export const GlobalContext = createContext(initialState);

function App() {

  return (
    <div className="App">
      <div>
        <nav>
          <ul className='d-flex gap-2 list-unstyled'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/checkout">Checkout</Link></li>
          <li><Link to="/payment">Payment</Link></li>
          </ul>
        </nav>
        <main>
        <GlobalProvider >
          <Routes>
          <Route path="/" element={ <HomePage/> } />
          <Route path="/checkout" element={ <Checkout/> } />
          <Route path="/payment" element={ <StripeContainer/> } />
        </Routes>
        </GlobalProvider>
        </main>
      </div>
    </div>
  )
}

export default App
