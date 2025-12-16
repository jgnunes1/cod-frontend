import "bootstrap/dist/css/bootstrap.min.css";
// opcional, mas necessário para o botão toggler funcionar
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { assets } from '../assets/assets.js';


const Menubar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
      <a className="navbar-brand" href="#">
        <img
          src={assets.logo}
          alt="Logo"
          height="40"
        />
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse p-2" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              Dashboard
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#">
              Explore
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#">
              Itens
            </a>
          </li> 

          <li className="nav-item">
            <a className="nav-link" href="#">
              Categorias  
            </a> 
          </li>

             <li className="nav-item">
            <a className="nav-link" href="#">
              Usuários  
            </a>
          </li>
        </ul>

        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Pesquisa"
            aria-label="Pesquisa"
          />
          <button className="btn btn-outline-light" type="submit">
            Pesquisa
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Menubar;
