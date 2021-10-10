const initialState = {
  airports: [],
}
export interface TypeAndPayloadTypes {
  type: string
  payload: Array<{}>
}

const airPortsReducer = (
  state = initialState,
  { type, payload }: TypeAndPayloadTypes
) => {
  switch (type) {
    case "SET_AIRPORTS":
      return { ...state, airports: payload }
    default:
      return state
  }
}

export default airPortsReducer
