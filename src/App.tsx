import "./App.css";
import AdminDashboard from "./ui/admin/AdminDashBoard";
import Dashboard from "./ui/Dashboard";
import Footer from "./ui/Footer";
import Hero from "./ui/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
