import React from "react";
import Cartao from "../../../components/cartoes/Cartao";
import CienteMessage from "../../../components/mensagens/CienteMensagem";
import { CadastrosSpec } from "../../Cadastros/specs/CadastrosSpec"

export default function CadastrosConsole() {
  const spec = {};
  spec.cadastrosSpec = CadastrosSpec.obter();

  return (
    <div className="card">
      <div className="colunas-3">
        {spec.cadastrosSpec && spec.cadastrosSpec.map((item, indice) => (
          <Cartao
            key={indice}
            titulo={item.titulo}
            subTitulo={item.subTitulo}
            urlImagem={item.urlImagem}
            conteudo={item.conteudo}
            item={item.item}
            rota_base={item.rota_base}
            onClick={item.onClick}
          />
        ))}
      </div>

      <CienteMessage />
    </div>
  )
}

