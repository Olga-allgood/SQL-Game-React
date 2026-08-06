import { Routes, Route } from "react-router-dom";


import Student from "./pages/Student";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Student />} />
    </Routes>
  );
}

export default App;