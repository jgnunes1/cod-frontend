import React from "react";
import ResumoAnaliseConsole from "../Analise/console/ResumoAnaliseConsole";


export default function PessoaResumoAnalise({ visible, setVisible, detalhesAnalise, spec }) {
    return (
        <ResumoAnaliseConsole
            titulo={"Análise de Pessoa"}
            visible={visible}
            setVisible={setVisible}
            detalhesAnalise={detalhesAnalise}
            spec={spec}
        />
    )
}