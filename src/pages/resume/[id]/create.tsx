import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(() => import('@/components/model/resume/Edit'), {
  ssr: false,
});

const Create: NextPage = () => {
  return <DynamicComponentWithNoSSR />;
};

export default Create;
