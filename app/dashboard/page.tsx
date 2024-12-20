import { requireUser } from "../lib/hooks";

export default async function () {
  const session = await requireUser();

  return <div className="">DashboardPage</div>;
}
