import TestPage from "App/Containers/Admin/TestPage";
import UploadImage from "App/Containers/Admin/TestPage/uploadImage";
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
      { path: "/floor-plans", element: <FloorPlanPage /> },
    ],
  },
  {
    path: "admin",
    element: <DashboardLayout />,
    children: [
      { path: "/test", element: <AdHomePage /> },
      { path: "/test2", element: <AdHomePage /> },
      { path: "/createBuilding", element: <TestPage /> },
      { path: "/upload", element: <UploadImage /> },
    ],
  },
];

export default appRoutes;
