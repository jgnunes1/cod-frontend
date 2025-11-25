import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { obterTodosOsDados } from "../../../../hooks/useDexie";

async function buscarTipoCondicaoIngresso(valor) {
  const registros = await obterTodosOsDados('ReposTipos', 'tipo_condicao_ingresso_imigrante');
  let formattedOptions = [];

  if (valor === 1) {
    formattedOptions = registros.filter(
      item => (item.id !== 2 && item.id !== 5)).map(item => ({
        key: item.id,
        name: item.nome
      }));
  } else if (valor === 2) {
    formattedOptions = registros.filter(
      item => item.id !== 1).map(item => ({
        key: item.id,
        name: item.nome
      }));
  }
  return formattedOptions;
}

export default function TempoResidenciaInput({
  label,
  name,
  value,
  error,
  id,
  disabled,
  onChange,
}) {
  const [tipoResidencia, setTipoResidencia] = useState(value?.tipo || "");
  const [subTipoResidencia, setSubTipoResidencia] = useState(value?.subTipo || "");
  const [opcoesSubTipo, setOpcoesSubTipo] = useState([]);

  const opcoesTipo = [
    { label: "Prazo Determinado", value: 1 },
    { label: "Prazo Indeterminado", value: 2 },
  ];

  useEffect(() => {
    if (tipoResidencia) {
      buscarTipoCondicaoIngresso(tipoResidencia).then((options) => {
        setOpcoesSubTipo(options.map(opt => ({ label: opt.name, value: opt.key })));
      });
    } else {
      setOpcoesSubTipo([]); // Limpa opções se o tipo não estiver selecionado
    }
  }, [tipoResidencia]);

  const handleTipoChange = (e) => {
    const novoTipo = e.value;
    setTipoResidencia(novoTipo);
    setSubTipoResidencia(""); // Resetar o subtipo ao trocar o tipo principal
    if (onChange) {
      onChange({ target: { name, value: { tipo: novoTipo, subTipo: "" } } });
    }
  };

  const handleSubTipoChange = (e) => {
    const novoSubTipo = e.value;
    setSubTipoResidencia(novoSubTipo);
    if (onChange) {
      onChange({ target: { name, value: { tipo: tipoResidencia, subTipo: novoSubTipo } } });
    }
  };

  return (
    <div className="colunas-2" id={id}>
      <div className="p-fluid">
        <label>{label}:</label>
        <Dropdown
          name="id_tipo_tempo_residencia_imigrante"
          value={tipoResidencia}
          options={opcoesTipo}
          onChange={handleTipoChange}
          placeholder="Selecione o tipo de residência"
          disabled={disabled}
          style={{ width: "100%" }}
        />
      </div>

      <div className="p-fluid">
        {tipoResidencia && (<>
          <label>Condição:</label>
          <Dropdown
            name="id_tipo_condicao_ingresso_imigrante"
            value={subTipoResidencia}
            options={opcoesSubTipo}
            onChange={handleSubTipoChange}
            placeholder="Selecione o subtipo de residência"
            disabled={disabled}
            style={{ width: "100%" }}
          />
        </>

        )}
      </div>

      <small>{error && <p>{error}</p>}</small>
    </div >
  );
}

TempoResidenciaInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.shape({
    id_tipo_tempo_residencia_imigrante: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id_tipo_condicao_ingresso_imigrante: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  error: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

TempoResidenciaInput.defaultProps = {
  value: {},
  error: "",
  id: "",
  disabled: false,
};