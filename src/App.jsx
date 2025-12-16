import { Routes, Route } from "react-router-dom";
import Menubar from "./components/Menubar";

import Dashboard from "./pages/Dashboard/Dashboard";
import Explore from "./pages/Explore/Explore";
import Categorias from "./pages/Categorias/Categorias";
import Itens from "./pages/Itens/Itens";
import Usuarios from "./pages/Usuarios/Usuarios";


const App = () => {
  return (
    <div>
      <Menubar />

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/itens" element={<Itens />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </div>
  );
};

export default App;
