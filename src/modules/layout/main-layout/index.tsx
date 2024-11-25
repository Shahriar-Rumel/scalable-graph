import Box from '@/components/layout/box';
import Menu from '@/components/layout/menu';
import Sidebar from '@/components/layout/sidebar';
import { FC, ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box className="md:flex relative p-4">
      <Sidebar />
      <Box className="w-full px-4 flex flex-col py-0 gap-4 overflow-hidden">
        <Menu />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
