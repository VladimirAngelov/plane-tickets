import { TypeAndPayloadTypes } from "../reducers/airportsReducer"

export const setBookings = (payload: Array<{}>): TypeAndPayloadTypes => ({
  type: "SET_BOOKINGS",
  payload,
})

export const removeBooking = (payload: Array<{}>): TypeAndPayloadTypes => ({
  type: "DELETE_BOOKING",
  payload,
})

export const addBooking = (payload: Array<{}>): TypeAndPayloadTypes => ({
  type: "ADD_BOOKING",
  payload,
})

export const setError = (payload: any): TypeAndPayloadTypes => ({
  type: "SET_ERROR",
  payload,
})
