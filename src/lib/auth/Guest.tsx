import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

/**
 * ログインしていないかどうかを判定する
 */
const Guest: React.FC = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (isUser) {
      router.push('/dashboard');
    }
  }, [isUser, status, router]);

  return <>{children}</>;
};

export default Guest;
