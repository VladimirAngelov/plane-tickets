import { TypeAndPayloadTypes } from "../reducers/airportsReducer"

export interface PayloadTypes {
  payload: Array<{}>
}

export const setAirports = (payload: Array<{}>): TypeAndPayloadTypes => ({
  type: "SET_AIRPORTS",
  payload,
})
