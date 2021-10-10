import React, { useEffect } from "react"
import "./App.css"
import BookingForm from "./components/BookingFrom"
import Bookings from "./components/Bookings"
import Header from "./components/Header"
import { getAirports } from "./utils/networkCall"

function App() {
  useEffect(() => {
    getAirports()
  }, [])
  return (
    <div className="container">
      <div className="app-wrapper">
        <Header />
        <BookingForm />
        <Bookings />
      </div>
    </div>
  )
}

export default App
