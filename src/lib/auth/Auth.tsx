import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

import BackdropLoader from '@/components/ui/BackdropLoader';

/**
 * ログインしているかどうかを判定する
 */
const Auth: React.FC = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!isUser) router.push('/login');
  }, [isUser, status, router]);

  if (isUser) {
    return <>{children}</>;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <BackdropLoader />;
};

export default Auth;
