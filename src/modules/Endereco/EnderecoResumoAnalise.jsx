import React from "react";
import ResumoAnaliseConsole from "../Analise/console/ResumoAnaliseConsole";


export default function EnderecoResumoAnalise({ visible, setVisible, detalhesAnalise, spec }) {
    return (
        <ResumoAnaliseConsole
            titulo={"Análise de Endereço"}
            visible={visible}
            setVisible={setVisible}
            detalhesAnalise={detalhesAnalise}
            spec={spec}
        />
    )
}