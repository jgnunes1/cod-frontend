import CategoriaForm from "../../components/CategoriaForm/CategoriaForm";
import CategoriaList from "../../components/CategoriaList/CategoriaList";
import "./Categorias.css";

const Categorias = () => {

    return (
        <div className="categorias-container text-light">
            <div className="left-column">
                <CategoriaForm />
            </div>
             <div className="right-column">

              <CategoriaList />
                
            </div>
        </div>  
    )
}
export default Categorias;