import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import BackdropLoader from '@/components/ui/BackDropLoader';

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

  if (!isUser) {
    return <>{children}</>;
  }

  return <BackdropLoader />;
};

export default Guest;
