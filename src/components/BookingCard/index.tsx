import "./styles/style.css"
import React from "react"
import { useSelector } from "react-redux"

import { RootState } from "../../store/index"

import { CloseIcon, PlaneIcon } from "../Icons"
import dateParser from "../../utils/dateParser"
import { deleteBooking } from "../../utils/networkCall"

interface BookingCardProps {
  bookedElement: {
    id: number
    firstName: string
    lastName: string
    returnDate: string
    departureDate: string
    departureAirportId: number
    arrivalAirportId: number
  }
}

const BookingCard: React.FunctionComponent<BookingCardProps> = ({
  bookedElement,
}) => {
  const { airports }: any = useSelector((store: RootState) => store.airports)

  const {
    id,
    firstName,
    lastName,
    returnDate,
    departureDate,
    departureAirportId,
    arrivalAirportId,
  } = bookedElement

  const currentDepartureAirport = airports.find(
    (a: { code: string; title: string; id: number }) =>
      a.id === departureAirportId
  )

  const currentArrivalAirport = airports.find(
    (a: { code: string; title: string; id: number }) =>
      a.id === arrivalAirportId
  )


  return (
    <div className="card-wrapper">
      <button onClick={() => deleteBooking(id)} className="delete-button">
        {CloseIcon}
      </button>
      <span className="card-names">{`${firstName} ${lastName}`}</span>
      <div className="card-airports">
        <div className="card-departure-airport">
          {currentDepartureAirport?.code} Airport
          <div className="card-date">{dateParser(departureDate)}</div>
        </div>
        {PlaneIcon}
        <div className="card-arrival-airport">
          {currentArrivalAirport?.code} Airport
          <div className="card-date">{dateParser(returnDate)}</div>
        </div>
      </div>
    </div>
  )
}

export default BookingCard
