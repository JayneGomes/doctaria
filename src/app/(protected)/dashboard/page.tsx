import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import SignOutButton from "./_components/sign-out-button";
const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.name}</p>
      {/* <Image */}
      {/* src={session?.user?.image as string} */}
      {/* alt="User" */}
      {/* width={100} */}
      {/* height={100} */}
      {/* /> */}
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
