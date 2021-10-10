import { TypeAndPayloadTypes } from "./airportsReducer"

const bookings: object[] = []

const initialState = {
  bookings,
  error: "",
}

const bookingsReducer = (
  state = initialState,
  { type, payload }: TypeAndPayloadTypes
) => {
  switch (type) {
    case "SET_BOOKINGS":
      const filteredBookings = payload.filter((a: any, i: number) => {
        const nextBooking: any = state.bookings.find((x: any) => x.id === a.id)

        return nextBooking?.id !== a.id
      })

      return { ...state, bookings: state.bookings.concat(filteredBookings) }
    case "ADD_BOOKING":
      state.bookings.push(payload)
      return { ...state, bookings: state.bookings }
    case "DELETE_BOOKING":
      const payloadObject: any = payload[0]

      const currentBooking: any = state.bookings.find(
        (x: any) => x.id === payloadObject.id
      )
      const index: number = state.bookings.indexOf(currentBooking)
      state.bookings.splice(index, 1)

      return { ...state, bookings: state.bookings }
    case "SET_ERROR":
      return { ...state, error: payload }
    default:
      return state
  }
}

export default bookingsReducer
