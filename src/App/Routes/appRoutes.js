import TestPage from "App/Containers/Admin/TestPage";
import DashboardLayout from "../Components/DashboardLayout/DashboardLayout";
import AdHomePage from "../Containers/Admin/HomePage/index";
import BmHomePage from "../Containers/BuildingManager/HomePage/index";

const appRoutes = [
  {
    path: "building-manager",
    element: <DashboardLayout />,
    children: [
      { path: "/test", element: <BmHomePage /> },
      { path: "/test2", element: <BmHomePage /> },
      { path: "/testPage", element: <TestPage /> },
    ],
  },
  {
    path: "admin",
    element: <DashboardLayout />,
    children: [
      { path: "/test", element: <AdHomePage /> },
      { path: "/test2", element: <AdHomePage /> },
    ],
  },
];

export default appRoutes;
