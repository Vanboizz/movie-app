import { UserAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function Home() {
  // logout
  const { user, setUser, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      logOut();
      setUser(null);
      localStorage.removeItem('credential');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      {user ? <button onClick={handleSignOut}>Log Out</button> : <Link href="/login">Sign In</Link>}
    </main>
  );
}
