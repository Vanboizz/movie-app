import { UserAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function Home() {
  // logout
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      {user?.displayName || user?.email ? (
        <button onClick={handleSignOut}>Log Out</button>
      ) : (
        <Link href="/login">Sign In</Link>
      )}
    </main>
  );
}
