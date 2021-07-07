import appRoutes from "./App/Routes/appRoutes";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import "App/Styles/Lib/demo.min.css";
import "App/Styles/Lib/tabler.min.css";

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
