import "./App.css";
import Dashboard from "./ui/dashboard/Dashboard";
import Footer from "./ui/Footer";
import Hero from "./ui/Hero";
import AdminDashboard from "./ui/admin/AdminDashBoard";
import AdminLogin from "./ui/admin/AdminLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConfirmTrip from "./ui/dashboard/ConfirmTrip";
import UserProfile from "./ui/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/confirm-trip" element={<ConfirmTrip />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
