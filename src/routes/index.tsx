import { ComponentType, FC } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { appRoutes as routes } from './route';

export interface RouteConfig {
  name: string;
  path: string;
  component: ComponentType;
  exact?: boolean;
  roles?: string[];
  children?: RouteConfig[];
}

const appRoutes: RouteConfig[] = routes;

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {appRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
