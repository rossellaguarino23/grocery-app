import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Inventory } from "./pages/Inventory";
import { ShoppingList } from "./pages/ShoppingList";
import { Splash } from "./pages/Splash";
import { Welcome } from "./pages/Welcome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    Component: Layout,
    children: [
      {
        path: "/welcome",
        Component: Welcome,
      },
      {
        path: "/pantry",
        Component: Inventory,
      },
      {
        path: "/shopping-list",
        Component: ShoppingList,
      },
    ],
  },
  {
    path: "*",
    Component: () => <Navigate to="/" replace />,
  },
]);
