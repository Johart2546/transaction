import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Payment from "./pages/Payment";
import Check_slipt from "./pages/check_slipt"; // นำเข้า Component ของหน้า CheckSlip

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Payment />} />
        <Route path="/check_slipt" element={<Check_slipt />} /> {/* เพิ่มเส้นทางไปที่หน้า check_slipt */}
      </Routes>
    </Router>
  );
};

export default App;
