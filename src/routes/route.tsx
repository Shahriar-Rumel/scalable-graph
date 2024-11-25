import React, { ReactNode, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteConfig } from '.';
import Loader from '@/components/ui/loader';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const Dashboard = React.lazy(() => import('../modules/pages/dashboard'));

const dashboard: RouteConfig = {
  path: '/',
  exact: true,
  name: 'Dashboard component',
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<Loader label={'Initializing app...'} />}>
        <Dashboard />
      </Suspense>
    </ProtectedRoute>
  ),
  roles: ['User']
};

export const appRoutes: RouteConfig[] = [dashboard];
