import { Button } from "primereact/button";
import { Card } from "primereact/card";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";

function Cartao(props) {
  
  const navigate = useNavigate();
  const rota_base = props.rota_base ? props.rota_base : "";
  const item = props.item ? props.item : "";
  const url = `/${rota_base}/${item}`;
  const cabecalho = props.urlImagem ? <img alt="Card" src={props.urlImagem} /> : null;

  function onClick(e) {
    if(rota_base != ''){
      navigate(url);  
    }else{
      navigate("/" + item);
    }    
  }
  const rodape = (
    <>
      <Button label="Entrar" onClick={(e)=>onClick(e)}icon="pi pi-check" />
    </>
  );

  return (
    <Card
      title={props.titulo}
      subTitle={props.subTitulo}
      footer={rodape}
      header={cabecalho ? cabecalho : null}
    >
      <p className="m-0">{props.conteudo}</p>
    </Card>
  );
}

Cartao.propTypes = {
  titulo: PropTypes.string,
  subTitulo: PropTypes.string,
  urlImagem: PropTypes.string,
  onClick: PropTypes.func,
  conteudo: PropTypes.node,
  rota_base: PropTypes.string,
  item: PropTypes.string,
};

Cartao.defaultProps = {
  titulo: "Sem título",
  subTitulo: "Defina um título",
  urlImagem: null,
  onClick: () => console.log("Defina os atributos rota_base e item para o cartão funcionar corretamente."),
  conteudo: "",
  rota_base: "",
  item: "",
};

export default Cartao;
