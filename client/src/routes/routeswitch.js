import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import { DispensaryList } from "../components/main/dispensarylist";
import { Menu } from "../components/main/menupage";
import { CartPage } from "../components/main/cartpage";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
