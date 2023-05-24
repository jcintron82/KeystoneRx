import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import { DispensaryList } from "../components/dispensarylist";
import { Home } from "../components/home";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dispensaries" element={<DispensaryList />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
