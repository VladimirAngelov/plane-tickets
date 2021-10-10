import { combineReducers, createStore } from "redux"
import airPortsReducer from "./reducers/airportsReducer"
import bookingsReducer from "./reducers/bookingsReducer"

const rootReducer = combineReducers({
  airports: airPortsReducer,
  bookings: bookingsReducer,
})
const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>

export default store
