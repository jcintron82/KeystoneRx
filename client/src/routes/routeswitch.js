import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import { DispensaryList } from "../components/main/dispensarylist";
import { Menu } from "../components/main/menupage";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
