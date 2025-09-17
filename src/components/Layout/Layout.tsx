import React from 'react';
import TopBar from '../../components/TopBar/TopBar';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <>
      <TopBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
