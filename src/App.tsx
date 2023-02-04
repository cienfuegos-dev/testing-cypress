import { Routes, Route, Link } from "react-router-dom";
import { Layout } from "./components/Layout";
import { About } from "./pages/About";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { NoMatch } from "./pages/NoMatch";

export default function App() {
  return (
    <div>
      <h1>Basic Example</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
