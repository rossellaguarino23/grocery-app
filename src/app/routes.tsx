import { createBrowserRouter, Navigate } from 'react-router';
import { Layout } from './components/Layout';
import { Inventory } from './pages/Inventory';
import { ShoppingList } from './pages/ShoppingList';
import { Splash } from './pages/Splash';
import { Welcome } from './pages/Welcome';
import { Manage } from './pages/Manage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Splash,
  },
  {
    path: '/welcome',
    Component: Welcome,
  },
  {
    Component: Layout,
    children: [
      {
        path: '/pantry',
        Component: Inventory,
      },
      {
        path: '/shopping-list',
        Component: ShoppingList,
      },
      {
        path: '/manage',
        Component: Manage,
      },
    ],
  },
  {
    path: '*',
    Component: () => <Navigate to="/" replace />,
  }
]);
