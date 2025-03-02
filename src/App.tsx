import "./App.css";
import Dashboard from "./ui/dashboard/Dashboard";
import Footer from "./ui/Footer";
import Hero from "./ui/Hero";
import AdminDashboard from "./ui/admin/AdminDashBoard";
import AdminLogin from "./ui/admin/AdminLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConfirmTrip from "./ui/dashboard/ConfirmTrip";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/confirm-trip" element={<ConfirmTrip price={100} currency={"LKR"}  pickup="Galle" destination="Colombo" distance="5KM" duration="5h" driver="Damian" vehicle="Wagon R" licensePlate="DAT-000" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
