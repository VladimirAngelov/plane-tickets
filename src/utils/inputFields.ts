const today = new Date()

var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()

const inputFields = [
  {
    name: "firstName",
    type: "text",
    placeholder: "First Name",
  },
  {
    name: "lastName",
    type: "text",
    placeholder: "Last Name",
  },
  {
    name: "departureDate",
    type: "date",
    min: date,
    placeholder: "Departure Date",
  },
  {
    name: "returnDate",
    type: "date",
    // min: date,
    placeholder: "Return Date",
  },
]

export default inputFields
