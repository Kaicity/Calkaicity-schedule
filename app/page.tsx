import { redirect } from 'next/navigation';
import Navbar from './components/Navbar';
import { Auth } from './lib/auth-action';

export default async function Home() {
  const session = await Auth();

  if (session?.user) {
    redirect('/dashboard');
  }
  return (
    <div className="max-w mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
    </div>
  );
}
