import './Itens.css';
import ItensForm from '../../components/ItensForm/ItensForm';

const Itens = () => {
    return (
          <div className="itens-container text-light">
            <div className="left-column">
                <ItensForm />
            </div>
             <div className="right-column">

                lista de itens
                
            </div>
        </div>  
    )
}
export default Itens;