import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import LocationForecast from "../pages/LocationForecast/LocationForecast";
import Settings from "../pages/Settings/Settings";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/:locationName" element={<LocationForecast />} />
    </Routes>
  );
};

export default Router;
