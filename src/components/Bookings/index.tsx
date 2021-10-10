import "./styles/style.css"
import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

import { getBookings } from "../../utils/networkCall"
import { RootState } from "../../store"

import BookingCard from "../BookingCard"

const Bookings: React.FunctionComponent<{}> = () => {
  const { bookings }: any = useSelector((store: RootState) => store.bookings)
  const currentRef = useRef<HTMLInputElement>(null)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [shouldLoadMore, setShouldLoadMore] = useState<boolean>(true)

  useEffect(() => {
    getBookings(currentPage).then((res) => {
      res.payload.length < 5 && setShouldLoadMore(false)
      setCurrentPage((prevPage) => prevPage + 1)
    })
  }, [])

  const loadMoreData = () => {
    getBookings(currentPage).then((res) => {
      res.payload.length < 5 && setShouldLoadMore(false)
      setCurrentPage((prevPage) => prevPage + 1)
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          loadMoreData()
        }
      },
      { threshold: 0.25 }
    )

    if (currentRef.current) observer.observe(currentRef.current)

    return () => {
      if (currentRef.current) {
        observer.unobserve(currentRef.current)
      }
    }
  }, [currentRef, currentPage])

  const renderedBookings = bookings.map(
    (b: {
      id: number
      firstName: string
      lastName: string
      returnDate: string
      departureDate: string
      departureAirportId: number
      arrivalAirportId: number
    }) => <BookingCard key={b.id} bookedElement={b} />
  )
  return (
    <div className="bookings-wrapper">
      <h1 className="bookings-heading">Bookings</h1>
      {bookings.length === 0 && <h3>You don't have booked anything yet.</h3>}
      {renderedBookings}
      {shouldLoadMore && (
        <div style={{ height: 100, width: "100%" }} ref={currentRef}></div>
      )}
    </div>
  )
}

export default Bookings
