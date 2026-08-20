import {
  Routes,
  Route,
} from "react-router-dom";

import Student from "./pages/Student";

import {
  ProgressProvider,
} from "./context/ProgressContext";

function App() {
  return (
    <ProgressProvider>
      <Routes>
        <Route
          path="/"
          element={<Student />}
        />
      </Routes>
    </ProgressProvider>
  );
}

export default App;