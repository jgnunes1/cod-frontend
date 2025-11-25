import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";

import Dexie from "dexie";
import AreaTextoInput from "../../../components/forms/input/AreaTextoInput";
import ArquivoInput from "../../../components/forms/input/ArquivoInput";
import CalendarioInput from "../../../components/forms/input/CalendarioInput";
import CheckboxInput from "../../../components/forms/input/CheckboxInput";
import LabelEditarInput from "../../../components/forms/input/LabelEditarInput";
import LabelInfoInput from "../../../components/forms/input/LabelInfoInput";
import NomeInput from "../../../components/forms/input/NomeInput";
import NumeroInput from "../../../components/forms/input/NumeroInput";
import PasswordInput from "../../../components/forms/input/PasswordInput";
import RadioButtonInput from "../../../components/forms/input/RadioButtonInput";
import CheckTextoInput from "../../../components/forms/input/CheckTextoInput";
import MascaraInput from "../../../components/forms/input/MascaraInput";
import SelecaoInput from "../../../components/forms/input/SelecaoInput";
import TextoInput from "../../../components/forms/input/TextoInput";
import TipoSexoInput from "../../../components/forms/input/TipoSexoInput";
import CampoOrientacoes from "./Orientacoes/CampoOrientacoes";
import PDFUploadButton from "./PDFUploadButton";
//import ValidacaoInput from "../../../components/validacoes/ValidacaoInput";


const db = new Dexie('ArquivosDB');
db.version(1).stores({
  dadosPessoais: 'nome,conteudo'
});


export default function CampoDialog({
  visible,
  onHide,
  value,
  label,
  id,
  onSave,
  obrigatorio = false,
  validar = null,
  typeInput = null,
  apiSchema = null,
  apiUrl = null,
  mask = null,
  arquivo = null,
  idsObrigatorios = null,
  orientacoes = null,
  outros = null,
  children,
}) {
  const [inicialValue, setInicialValue] = useState(value || null);
  const [inputValue, setInputValue] = useState(value || null);
  const [error, setError] = useState(null);
  const [editar, setEditar] = useState(false);
  const [arquivoObrigatorio, setArquivoObrigatorio] = useState(false);

  useEffect(() => {
    if (typeInput == "SelecaoInput" && value > 0) {
      setEditar(true);
    }
    prepararMascaras();
    if (id == "nome_pai") {
     // console.log("campo dialog use effect", value)
      onSave(value, id);
    }

  }, []);

  useEffect(() => {
    prepararIdsObrigatorios();
  }, [inputValue])

  const prepararIdsObrigatorios = () => {
    if (idsObrigatorios == null && arquivo != null) {
      setArquivoObrigatorio(true);
      return;
    }
    setArquivoObrigatorio(idsObrigatorios?.includes(inputValue));
  }

  const prepararMascaras = () => {
    //console.log("prepararMascaras "+id,mask)
    if (mask) {
      if (value != undefined && mask === "data") {
        const [year, month, day] = value?.split("-");
        const d = `${day}/${month}/${year}`;
        setInputValue(day == undefined ? value : d);
        return;
      }
      if (mask === "cpf") {
        const newValue = value?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        setInputValue(newValue);
        return;
      }
      if (mask === "pis") {
        const newValue = value?.replace(/(\d{3})(\d{5})(\d{2})/, "$1.$2.$3");
        setInputValue(newValue);
        return;
      }
      return;
    }
  }

  const handleChange = (e) => {

    if (id == "nome") {
      //console.log("campo dialog handleChange ",inputValue, e)
      const novosNomes = { ...e };
      setInputValue(novosNomes);
      return;
    }
    setInputValue(e.target.value);
  }

  const validarArquivo = async () => {
    if (arquivo && arquivoObrigatorio) {
      try {
        const retorno = await db["dadosPessoais"].get(arquivo);
        if (!retorno) {
          setError("O arquivo não foi selecionado. Por favor, selecione o arquivo antes de continuar.");
          return false;
        }
      } catch (err) {
        console.error("Erro ao verificar o arquivo no IndexedDB:", err);
        setError("Erro ao validar o arquivo. Tente novamente.");
        return false;
      }
    }
    return true;
  };

  const handleSave = async () => {
    // Validação obrigatória
    if (id === "nome") {
      console.log("campo dialog handleSave ", inputValue);
      const validationError = validar(inputValue?.nome);
      if (validationError) {
        setError(validationError);
        return;
      }
      const arquivoValido = await validarArquivo();
      if (!arquivoValido) {
        return;
      }
      // Tudo validado, prossegue com a lógica de salvar
      setError(null);
      onSave(inputValue); // Passa o valor atualizado para o componente pai
      onHide();
      return;
    }

    if (obrigatorio && !inputValue) {
      setError("Este campo é obrigatório.");
      return;
    }
    // Validação adicional
    if (validar) {
      const validationError = validar(inputValue);
      if (validationError) {
        setError(validationError);
        return;
      }
    }
    // Validação do arquivo
    const arquivoValido = await validarArquivo();
    if (!arquivoValido) {
      return;
    }
    // Tudo validado, prossegue com a lógica de salvar
    setError(null);
    onSave(inputValue); // Passa o valor atualizado para o componente pai
    onHide(); // Fecha o diálogo
  };


  let InputComponent;

  if (typeInput == "TextoInput") InputComponent = TextoInput;
  if (typeInput == "NomeInput") InputComponent = NomeInput;
  if (typeInput == "SelecaoInput") InputComponent = SelecaoInput;
  if (typeInput == "NumeroInput") InputComponent = NumeroInput;
  if (typeInput == "MascaraInput") InputComponent = MascaraInput;
  if (typeInput == "CheckboxInput") InputComponent = CheckboxInput;
  if (typeInput == "RadioButtonInput") InputComponent = RadioButtonInput;
  if (typeInput == "CalendarioInput") InputComponent = CalendarioInput;
  if (typeInput == "AreaTextoInput") InputComponent = AreaTextoInput;
  if (typeInput == "LabelEditarInput") InputComponent = LabelEditarInput;
  if (typeInput == "LabelInfoInput") InputComponent = LabelInfoInput;
  if (typeInput == "PasswordInput") InputComponent = PasswordInput;
  if (typeInput == "ArquivoInput") InputComponent = ArquivoInput;
  if (typeInput == "TipoSexoInput") InputComponent = TipoSexoInput;
  if (typeInput == "CheckTextoInput") InputComponent = CheckTextoInput;
  // if (typeInput == "SimouNaoInput") {
  //     InputComponent = SimouNaoInput
  //     if (valoresFormulario !== null){
  //         valoresFormulario[item?.name] = valoresFormulario[item.name] || false;
  //     }
  // };

  const renderOrientacoes = (<><CampoOrientacoes titulo={label || null} texto={orientacoes || null} /></>)

  const renderArquivo = (
    <>
      {arquivo && arquivoObrigatorio && <section className="p-fluid">
        <PDFUploadButton obrigatorio={true} nome={arquivo} rotulo="Identidade" />
      </section>}
    </>)

  const fechar = () => {
    setEditar(false);
    setInicialValue(inicialValue);
    onHide();
  }

  const footerEditar = (
    <div>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={fechar}
        style={{ marginRight: "0.25em" }}
      />
      <Button label="Salvar" icon="pi pi-check" onClick={handleSave} />
    </div>
  )

  const footerVisualizar = (
    <div>
      <Button
        label="Fechar"
        icon="pi pi-times"
        onClick={onHide}
        style={{ marginRight: "0.25em" }}
      />
    </div>
  )

  const renderInput = () => {
    if (id !== 'nome') return (<h1 style={{ fontSize: "1.5rem", padding: "1%", textAlign: "center" }}>{inputValue || "Não Informado"}</h1>);
    //return (<>{renderJSON(inputValue)}</>)

    const nome_social = inputValue?.nome_social !== null ? (<><label className="azul"> Nome Social: </label><h1 style={{ fontSize: "1.5rem" }}>{inputValue?.nome_social}</h1></>) : null;
    const nome_receita = (inputValue?.nome_receita !== null) && (inputValue?.nome_receita !== inputValue) ? (<><label className="azul"> Nome Receita: </label><h1 style={{ fontSize: "1.5rem" }}>{inputValue?.nome_receita}</h1></>) : null;

    return (
      <section style={{ padding: "1%", textAlign: "center" }}>
        {/* {nome_social} */}
        <label className="azul"> Nome Civil: </label>
        <h1 style={{ fontSize: "1.5rem" }}>{inputValue?.nome || "Não Informado"}</h1>
        {nome_receita}
      </section >
    )

  }
  const renderInputVisualizar = (
    <>
      {renderInput()}
      <Button icon="pi pi-pen-to-square" label="Editar" onClick={() => setEditar(true)} />
    </>
  )

  const renderInputEditar = (
    <>
      <div className="p-fluid">
        <label className="negrito" htmlFor={`campo-${id}`}>{label || "Valor"} </label>
        {InputComponent ? (
          <InputComponent
            id={`campo-${id}`}
            name={`campo-${id}`}
            value={inputValue}
            onChange={handleChange}
            validar={validar}
            apiSchema={apiSchema}
            apiUrl={apiUrl}
            maskModel={mask || ""}
            outros={outros}
          />
        ) : (
          <p className="p-error">Componente de entrada inválido</p>
        )}
        {error && <small className="p-error">{error}</small>}
      </div>
      {renderArquivo}
    </>)
  return (
    <Dialog
      header={`Editar ${label}`}
      visible={visible}
      onHide={onHide}
      style={{ width: "75vw", maxWidth: "98vw" }}
      footer={editar ? footerEditar : footerVisualizar}
      breakpoints={{
        '960px': '85vw',
        '640px': '95vw',
      }}
    >
      {/* {renderJSON(arquivoObrigatorio)} */}
      {/* {renderJSON(arquivo)} */}

      {renderOrientacoes}
      {editar ? renderInputEditar : renderInputVisualizar}
      <section>
        {children}
      </section>

    </Dialog>
  );
}
