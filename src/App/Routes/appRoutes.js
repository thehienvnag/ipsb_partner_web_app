import CreateBuildingPage from "App/Containers/Admin/CreateBuildingPage/createBuilding";
import FloorPlanPage from "App/Containers/BuildingManager/FloorPlanPage";
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
      {
        path: "/floor-plans",
        element: <FloorPlanPage />,
        children: [{ path: "/test", element: <BmHomePage /> }],
      },
    ],
  },
  {
    path: "admin",
    element: <DashboardLayout />,
    children: [
      { path: "/test", element: <AdHomePage /> },
      { path: "/test2", element: <AdHomePage /> },
      { path: "/createBuilding", element: <CreateBuildingPage /> },
    ],
  },
];

export default appRoutes;
