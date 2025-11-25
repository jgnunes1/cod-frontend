import React from "react";
import ResumoAnaliseConsole from "../Analise/console/ResumoAnaliseConsole";


export default function GrauInstrucaoResumoAnalise({ visible, setVisible, detalhesAnalise, spec }) {
    return (
        <ResumoAnaliseConsole
            titulo={"Análise de Grau de Instrução"}
            visible={visible}
            setVisible={setVisible}
            detalhesAnalise={detalhesAnalise}
            spec={spec}
        />
    )
}