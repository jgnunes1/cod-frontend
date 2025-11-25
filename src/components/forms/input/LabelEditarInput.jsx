import React, { useEffect, useState } from "react";
import { obterDadoPeloId } from "../../../hooks/useDexie";
import DeficienciaDialog from "../../../modules/Pessoa/components/DeficienciaDialog";
import EstrangeiroDialog from "../../../modules/Pessoa/components/EstrangeiroDialog";
import CampoDialog from "../../../modules/shared/components/CampoDialog";

export default function LabelEditarInput({
  id,
  label,
  value = null,
  valueAnalise = null,
  handleValue = () => { },
  validar = null,
  typeInput = "SelecaoInput",
  apiSchema = null,
  apiUrl = null,
  mask = null,
  arquivo = null,
  idsObrigatorios = null,
  orientacoes = null,
  status = null,
  onArquivoChange = () => { },
  outros = null

}) {
  const [dialogVisible, setDialogVisible] = useState(false);
  //const [displayValue, setDisplayValue] = useState(value || null);
  const [displayValue, setDisplayValue] = useState(valueAnalise || value || null);
  //const [originalValue, setOrignalValue] = useState(null);
  const [exibirDeficiencia, setExibirDeficiencia] = useState(false);
  const [exibirEstrangeiro, setExibirEstrangeiro] = useState(false);
  const [dataDeficienciaEstrangeiro, setDataDeficienciaEstrangeiro] = useState(valueAnalise || outros || null);
  const [idSelecao, setIdSelecao] = useState(null);
  const databaseName = "ReposTipos"; // Nome do banco Dexie
  const tableName = apiUrl; // Tabela onde o dado será buscado
 // console.log('valueAnalise', valueAnalise);
 // console.log('dataDeficienciaEstrangeiro', dataDeficienciaEstrangeiro);
  useEffect(() => {
    if (typeInput == "SelecaoInput" && value && tableName) {
      // ser temos uma valor em análise ele deve ser priorizado
      const entrada = valueAnalise || value;
      obterDadoPeloId(databaseName, tableName, entrada).then((record) => {
        if (record?.nome) {
          setDisplayValue(record.nome);
          setIdSelecao(record.id);
        } else {
          setDisplayValue("Não Informado");
        }
      });
      return;
    }

    //  if (id == "deficiencias" || id == "estrangeiro") {
    //   if (valueAnalise || value) {
    //     setDisplayValue("SIM");
    //   } else{
    //     setDisplayValue("NÃO");
    //   }
    //   return;
    //  }



    if (mask) {
      if (value != undefined && mask === "data") {
        const [year, month, day] = value?.split("-");
        const d = `${day}/${month}/${year}`;
        setDisplayValue(d);
        return;
      }

      if (mask === "cpf") {
        const newValue = value?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        setDisplayValue(newValue);
        return;
      }
      if (mask === "pis") {
        const newValue = value?.replace(/(\d{3})(\d{5})(\d{2})/, "$1.$2.$3");
        setDisplayValue(newValue);
        return;
      }
      return;
    }

    if (valueAnalise == null || id == 'deficiencias' || id == 'estrangeiro') {
      setDisplayValue(value);
      return;
    } else {
      tratarValorAnalise()
      return;
    }

  }, []);

  useEffect(() => {
    if (id == "deficiencias" || id == "estrangeiro") {
      handleValue(dataDeficienciaEstrangeiro, id);
      return;
    }
  }, [dataDeficienciaEstrangeiro]);

  useEffect(() => {
    if (id != 'deficiencias' && id != 'estrangeiro') {


      if (typeInput == "SelecaoInput") {
        handleValue(idSelecao, id);
        return;
      }

      if (id == 'nome') {
        handleValue(displayValue, id);
        return;
      }

      if (mask) {
        handleValue(displayValue, id, mask);
        return;
      }

      handleValue(displayValue, id);
    }
  }, [displayValue]);

  const tratarValorAnalise = () => {
    setDisplayValue(valueAnalise);
    handleValue(displayValue, id);
  }

  const handleClick = () => {
    status.valido = null;
    status.mensagem = null;
    if (id == "deficiencias") {
      setExibirDeficiencia(true);
      return;
    }

    if (id == "estrangeiro") {
      setExibirEstrangeiro(true);
      return;
    }
    setDialogVisible(true); // Abre o CampoDialog
  };


  const handleSave = (newValue) => {
    if (typeInput === "SelecaoInput" && tableName) {
      // Buscar o nome pelo ID selecionado
      obterDadoPeloId(databaseName, tableName, newValue).then((record) => {
        if (record?.nome) {
          setDisplayValue(record.nome);
          setIdSelecao(record.id);
        }
      });
    }

    setDisplayValue(newValue); // Atualiza o valor ao salvar no CampoDialog
    setDialogVisible(false); // Fecha o diálogo
  };

  // const handleChangeArquivo = async (arquivo) => {
  //   onArquivoChange(arquivo);
  // }

  const icon = () => {
    let i = "azul";
    if (value === null) i = "laranja";

    return (
      <i
        id={`button-${id}`}
        className={`pi pi-pen-to-square ${i}`}
        onClick={handleClick}
        style={{ cursor: "pointer", fontSize: "1.5em", paddingLeft: ".5em" }}
      />
    );
  };

  const tratarNome = () => {
    if (id !== "nome") return displayValue || null;
    return value;
  }

  const renderCampoDialog = (
    <>
      <CampoDialog
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        value={tratarNome()}
        id={id}
        label={label}
        onSave={handleSave}
        obrigatorio={true} // Define o campo como obrigatório
        typeInput={typeInput}
        validar={validar}
        apiSchema={apiSchema}
        apiUrl={apiUrl}
        mask={mask}
        orientacoes={orientacoes}
        idsObrigatorios={idsObrigatorios}
        arquivo={arquivo}
        outros={outros}
      >
      </CampoDialog>
    </>
  )

  const handleDeficienciaEstrangeiro = (deficienciasEstrangeiro) => {
    setDataDeficienciaEstrangeiro(deficienciasEstrangeiro);
    setDisplayValue("SIM");
  }
//console.log('dataDeficienciaEstrangeiro', dataDeficienciaEstrangeiro);
  const renderDeficiencia = (
    <>
      <DeficienciaDialog
        isVisible={exibirDeficiencia}
        setIsVisible={() => setExibirDeficiencia(false)}
        onSave={handleDeficienciaEstrangeiro}
        data={dataDeficienciaEstrangeiro}
      />
    </>
  )

  const renderEstrangeiro = (<>
    <EstrangeiroDialog
      isVisible={exibirEstrangeiro}
      setIsVisible={() => setExibirEstrangeiro(false)}
      onSave={handleDeficienciaEstrangeiro}
      data={dataDeficienciaEstrangeiro}
    />
  </>)

  const renderNome = () => {
    return null
  }

  const renderEstadoCivil = () => {
    return null
  }
  const renderDialog = () => {
    if (id == "deficiencias") return renderDeficiencia;
    if (id == "estrangeiro") return renderEstrangeiro;
    return renderCampoDialog;
  }

  const renderStatusValidacao = () => {
    if (status?.valido == null) return;

    const s = status?.valido ? "check" : "times";
    const c = status?.valido ? "green" : "red";
    const p = status?.valido ? "" : "icon-status-piscante";

    return (
      <i
        className={`pi pi-${s}-circle ${p}`}
        style={{ color: c, marginRight: ".25em" }}
      />
    );
  }


  const renderIcoAnalise = () => {
    if (valueAnalise == null) return;
    return (
      <i
        className={`pi pi-receipt`}
        style={{ color: "orange" }}
      />
    );
  }

  const renderValue = () => {
    if (id !== 'nome') return (
      <>
        <div className="p-fluid">
          <label className="me-2">{label}:</label>
          <label className="label-editar-input">
            {renderIcoAnalise()} {renderStatusValidacao()} {(value || valueAnalise) ? displayValue : "Não Informado"}{icon()}
          </label>
          <p className="dados-pessoais-status">{status?.mensagem}</p>
        </div>
      </>
    )

    const nomeExibicao = value?.nome_social || value?.nome;
    const nomeCivil = (value?.nome_social !== null) ? (<section className='azul'> Nome Civil: <strong > {value?.nome}</strong></section>) : null;
    const nomeReceita = (value?.nome_receita !== null) && (value?.nome_receita !== value) ? (<section className='azul'> Nome Receita: <strong > {value?.nome_receita}</strong></section>) : null;

    return (<>
      <div className="p-fluid">
        <label className="me-2">{label}:</label>
        <label className="label-editar-input">
          {renderIcoAnalise()} {renderStatusValidacao()} {nomeExibicao}{icon()}
        </label>
        {nomeCivil}
        {nomeReceita}
        <p className="dados-pessoais-status">{status?.mensagem}</p>
      </div>
    </>);
  }

  return (
    <>
      <div id={id} className="label-editar">
        <div className="d-flex justify-content-between align-items-center">

          {renderValue()}

          {/* <button onClick={()=>handleValue(valueAnalise, id)}>a</button> */}
        </div>
      </div>
      {renderDialog()}


    </>
  );
}
