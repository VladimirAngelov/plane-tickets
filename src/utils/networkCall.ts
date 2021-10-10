import { Dispatch, SetStateAction } from "react"
import store from "../store"
import { setAirports } from "../store/actions/airportsAction"
import {
  setBookings,
  removeBooking,
  addBooking,
  setError,
} from "../store/actions/bookingsActions"

export const API_ENDPOINT: string =
  "https://vm-fe-interview-task.herokuapp.com/api/"
const API_KEY = process.env.REACT_APP_API_KEY
export const GET_AIRPORTS: string = `${API_ENDPOINT}airports?api_key=${API_KEY}`
export const GET_BOOKINGS: string = `${API_ENDPOINT}bookings?authToken=${API_KEY}`
export const ADD_BOOKING: string = `${API_ENDPOINT}bookings/create?authToken=${API_KEY}`
export const DELETE_BOOKED: string = `${API_ENDPOINT}bookings/delete/`

export const getAirports = () => {
  return fetch(GET_AIRPORTS)
    .then((res) => res.json())
    .then((airports) => store.dispatch(setAirports(airports)))
    .catch(() => store.dispatch(setError("Something went wrong.")))
}

export const getBookings = (page: number) => {
  return fetch(`${GET_BOOKINGS}&pageIndex=${page}`)
    .then((res) => res.json())
    .then((bookings) => store.dispatch(setBookings(bookings.list)))
    .catch(() => store.dispatch(setError("Something went wrong.")))
}

export const createBooking = (
  body: object,
  setNotification: Dispatch<SetStateAction<string>>,
  onChangeHandlers: Array<{
    name: string
    handler: Dispatch<SetStateAction<string>>
  }>
) => {
  return fetch(ADD_BOOKING, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => {
      store.dispatch(addBooking(res))
      store.dispatch(setError(""))
      const inputs = document.querySelectorAll<HTMLInputElement>(
        ".booking-form-input"
      )
      Array.from(inputs).forEach((input) => (input.value = ""))
      onChangeHandlers.forEach(({ handler }) => handler(""))
      setNotification("Successfully added.")
    })
    .catch(() => store.dispatch(setError("Make sure the dates are correct.")))
}

export const deleteBooking = (id: number) => {
  return fetch(`${DELETE_BOOKED}${id}?authToken=${API_KEY}`, {
    method: "DELETE",
  })
    .then(() => store.dispatch(removeBooking([{ id }])))
    .catch(() => store.dispatch(setError("Something went wrong.")))
}
