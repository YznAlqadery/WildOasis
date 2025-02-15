"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

export async function updateProfileAction(formData) {
  const session = await auth();
  if (!session) {
    throw new Error("You need to be signed in to update your profile");
  }
  const national_id = formData.get("national_id");
  const [nationality, country_flag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(national_id)) {
    throw new Error("Invalid national ID number");
  }

  // Here we would update the user's profile in the database
  const updatedData = { nationality, country_flag, national_id };

  const { data, error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  // Revalidate the /account/profile page to show the updated data(Manual revalidation)
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) {
    throw new Error("You need to be signed in to delete a reservation");
  }

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  // Check if the user owns the reservation by checking if the bookingId is in the guest's bookings
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You can only delete your own reservations");
  }

  // Here we would delete the reservation from the database
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  // Revalidate the /account/reservations page to show the updated data(Manual revalidation)
  revalidatePath("/account/reservations");
}
