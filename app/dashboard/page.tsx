import { requireUser } from '../lib/hooks';

export default async function () {
  try {
    const session = await requireUser();
    return <div>DashboardPage</div>;
  } catch (error) {
    console.error('Error loading dashboard:', error);
    return <div>Error loading dashboard.</div>;
  }
}
