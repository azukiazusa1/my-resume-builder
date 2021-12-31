import { NextPage } from 'next';

import Auth from '@/lib/auth/Auth';

const Dashboard: NextPage = () => {
  return (
    <Auth>
      <div>dashboard page.</div>;
    </Auth>
  );
};

export default Dashboard;
