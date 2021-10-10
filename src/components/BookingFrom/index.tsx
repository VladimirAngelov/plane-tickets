import "./styles/style.css"
import React, { useState } from "react"
import { useSelector } from "react-redux"

import inputFields from "../../utils/inputFields"
import FormFields from "../FormFields"

import { RootState } from "../../store"
import { createBooking } from "../../utils/networkCall"

const BookingForm: React.FunctionComponent<{}> = () => {
  const { airports }: any = useSelector((store: RootState) => store.airports)
  const { error }: any = useSelector((store: RootState) => store.bookings)
  const [formError, setFormError] = useState<string | undefined>(undefined)
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [returnDate, setReturnDate] = useState<string>("")
  const [departureDate, setDepartureDate] = useState<string>("")
  const [departureAirportId, setDepartureAirportId] = useState<number>(1)
  const [arrivalAirportId, setArrivalAirportId] = useState<number>(1)

  const onChangeHandlers = [
    { name: "firstName", handler: setFirstName },
    { name: "lastName", handler: setLastName },
    { name: "departureDate", handler: setDepartureDate },
    { name: "returnDate", handler: setReturnDate },
  ]

  const inputValues = [
    { name: firstName },
    { name: lastName },
    { name: departureDate },
    { name: returnDate },
  ]

  const body = {
    firstName,
    lastName,
    returnDate,
    departureDate,
    departureAirportId,
    arrivalAirportId,
  }

  const onFormSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    ;(!formError &&
      firstName &&
      returnDate &&
      departureDate &&
      lastName &&
      createBooking(body)) ||
      setFormError("All fields are required.")
  }

  const airportsOptions = airports.map(
    (airport: { title: string; id: number; code: string }) => (
      <option key={airport.id} value={airport.id}>
        {airport.title}
      </option>
    )
  )

  return (
    <form className="booking-form" onSubmit={onFormSubmit}>
      <FormFields
        fields={inputFields}
        setFormError={setFormError}
        inputValues={inputValues}
        onChangeHandlers={onChangeHandlers}
      />
      <div className="booking-form-select-wrapper">
        <div className="booking-form-placeholder">Departure Airport</div>
        <select
          className="booking-form-select"
          name="Departure Airport"
          value={departureAirportId}
          onChange={(e) => setDepartureAirportId(Number(e.target.value))}
        >
          {airportsOptions}
        </select>
      </div>
      <div className="booking-form-select-wrapper">
        <div className="booking-form-placeholder">Destination Airport</div>
        <select
          className="booking-form-select"
          name="Departure Airport"
          value={arrivalAirportId}
          onChange={(e) => setArrivalAirportId(Number(e.target.value))}
        >
          {airportsOptions}
        </select>
      </div>
      <input className="booking-form-button" type="submit" />
      {error || formError ? (
        <div className="form-error-message">{error || formError}</div>
      ) : (
        ""
      )}
    </form>
  )
}

export default BookingForm
