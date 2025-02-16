import { Route, Routes } from "react-router-dom";
import Login from "./lib/pages/login";
import Tasks from "./lib/pages/tasks";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
};

export default App;
