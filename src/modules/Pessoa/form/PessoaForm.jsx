import React, { useState } from "react";
import CarregandoDialog from "../../shared/components/CarregandoDialog";
import AnaliseBaseForm from "../../../components/forms/AnaliseBaseForm";

export default function PessoaForm({
    spec = null,
    item = null,
    setItem = null,
    salvar = null,
    editar = null,
    contexto = null,
    contextoMestre = null
}) {
    const [arquivos, setArquivos] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit", item);
        if (item.id) {
            console.log('Editar item', item);
            editar(item);

        } else {
            console.log('Criar item', item);
            //salvar(item);

        }
    };


    return (<>
        <AnaliseBaseForm
            spec={spec}
            item={item}
            setItem={setItem}
            arquivos={arquivos}
            onSubmit={handleSubmit}
            setArquivos={setArquivos}
            contexto={contexto}
            >
        </AnaliseBaseForm>
        <CarregandoDialog visible={contexto?.carregando} />
        {/* {renderJSON(arquivos)} */}
        <hr/>
        {/* {renderJSON(contexto?.mensagem)} */}
        {/* {renderJSONC(contexto?.item)} */}
    </>)

}

