"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "@/app/_lib/actions";

export default function ReservationList({ bookings }) {
  /*
  1. The useOptimistic hook takes two arguments: the current state(state that will be rendered) 
  and a function that updates the state which determines the next optmistic state.
  2. The useOptimistic hook returns an array with two elements: the current state and a function
    that updates the state.
  3. The handleDelete function takes a bookingId as an argument and calls the optimisticDelete function
    with the bookingId as an argument.
  4. The handleDelete function then calls the deleteReservation function with the bookingId as an argument.
  5. The optimisticDelete function filters the currentBookings array to remove the booking with the bookingId.
  6. The optimisticDelete function is passed to the useOptimistic hook as the second argument.

  */
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      return currentBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
