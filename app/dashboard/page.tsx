import { auth } from '../lib/auth';

export default async function () {
  const session = await auth();

  return <div>DashboardPage</div>;
}
