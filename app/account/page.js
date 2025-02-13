import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest and Booking Management",
};

export default async function Page() {
  const session = await auth();
  console.log(session);
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {session.user.name.split(" ").at(0)}
    </h2>
  );
}
