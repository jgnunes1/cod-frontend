import { assets } from "../assets/assets.js";
import { NavLink, Link } from "react-router-dom";

const Menubar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
      <Link className="navbar-brand" to="/dashboard">
        <img src={assets.logo} alt="Logo" height="40" />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse p-2" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/explore">Explore</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/itens">Itens</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/categorias">Categorias</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/usuarios">Usuários</NavLink>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Menubar;
