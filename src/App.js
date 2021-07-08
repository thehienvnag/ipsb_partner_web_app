import appRoutes from "./App/Routes/appRoutes";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import "./App.scss";
import "antd/dist/antd.css";

function App() {
  const routes = useRoutes(appRoutes);
  return routes;
}

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
