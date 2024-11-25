import MainLayout from '@/modules/layout/main-layout';
import NetworkGraph from './network-graph';
import { FC } from 'react';
import Box from '@/components/layout/box';

const Dashboard: FC = () => {
  return (
    <MainLayout>
      <Box className="w-full mx-4 border rounded-xl p-0 h-[90vh] relative lg:w-full lg:h-full mx-auto">
        <NetworkGraph />
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
