import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Dashboard from "./features/save/pages/Dashboard";
import Homepage from "./features/home/pages/Homepage";
import ItemDetails from "./features/save/components/ItemDetails";
import DashboardHome from "./features/save/components/DashboardHome";
import GraphVisualization from "./features/save/components/GraphVisualization";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage/>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <Protected><Dashboard/></Protected>,
    children: [
      {
        index: true,
        element: <DashboardHome/>
      },
      {
        path: "save/:id",
        element: <ItemDetails/>
      },
      {
        path: "graph",
        element: <GraphVisualization/>
      }
    ]
  },
]);

export default router;