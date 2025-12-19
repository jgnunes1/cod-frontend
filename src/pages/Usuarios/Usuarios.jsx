import UsuarioForm from '../../components/UsuarioForm/UsuarioForm';
import UsuarioList from '../../components/UsuarioList/UsuarioList';
import './Usuarios.css';

const Usuarios = () => {
    return (
          <div className="usuarios-container text-light">

            <div className="left-column">

               <UsuarioForm />

            </div>
             <div className="right-column">

                <UsuarioList />
                
            </div>
        </div>  
    )
}
export default Usuarios;