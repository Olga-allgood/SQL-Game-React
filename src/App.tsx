import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import AdminLayout from "./components/AdminLayout";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<AdminLayout />}>
      <Route path="/" element={<Navigate to="/admin" replace/>} />
       <Route path="/admin" element={<Admin />} />
      </Route>
      <Route path="/student" element={<Student />} />
    </Routes>
  );
}

export default App;