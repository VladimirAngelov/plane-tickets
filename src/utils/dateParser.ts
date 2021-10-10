const dateParser = (date: string): string => {
  return date?.split("T")[0]
}

export default dateParser
