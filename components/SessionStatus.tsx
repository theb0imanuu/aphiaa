// components/SessionStatus.tsx
import { useSession } from 'next-auth/react';

const SessionStatus = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div>You are not logged in.</div>;
  }

  return <div>Welcome, {session.user?.email}!</div>;
};

export default SessionStatus;
