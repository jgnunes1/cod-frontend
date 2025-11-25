import React from "react";
import AreaTextoInput from "../components/forms/input/AreaTextoInput";
import ArquivoInput from "../components/forms/input/ArquivoInput";
import CalendarioInput from "../components/forms/input/CalendarioInput";
import CheckboxInput from "../components/forms/input/CheckboxInput";
import CheckTextoInput from "../components/forms/input/CheckTextoInput";
import LabelEditarInput from "../components/forms/input/LabelEditarInput";
import LabelInfoInput from "../components/forms/input/LabelInfoInput";
import MascaraInput from "../components/forms/input/MascaraInput";
import NumeroInput from "../components/forms/input/NumeroInput";
import PasswordInput from "../components/forms/input/PasswordInput";
import RadioButtonInput from "../components/forms/input/RadioButtonInput";
import SelecaoInput from "../components/forms/input/SelecaoInput";
import SimouNaoInput from "../components/forms/input/SimouNaoInput";
import TextoInput from "../components/forms/input/TextoInput";
import ValidacaoInput from "../components/validacoes/ValidacaoInput";
import PossuiFilhosInput from "../modules/shared/components/Inputs/PossuiFilhosInput";
import TempoResidenciaInput from "../modules/shared/components/Inputs/TempoResidenciaInput";
import OnChangeAplicacao from './onChangeAplicacao';

export default function useProcessaForm({
    itens = [],
    erros = null,
    setErros = null,
    valoresFormulario = null,
    setValoresFormulario = null,
    contexto = null,
    contextoMestre = null
}) {
    //  return (<><section>processaForm metodo</section>{renderJSON(valoresFormulario)}<section>itens</section>{renderJSON(itens)}</>)
    //console.log('valoresFormulario', valoresFormulario);    
    return (
        <div key={itens[0].key} className={`colunas-${itens.length}`}>
            {itens.map((item) => processaLinhas({ item, valoresFormulario, setValoresFormulario, erros, setErros, contexto, contextoMestre }))}
        </div>
    );
}

function processaLinhas({ item, valoresFormulario, setValoresFormulario, erros, setErros, contexto, contextoMestre }) {

    const handleInputChange = (e) => {
        // console.log(valoresFormulario);

        if ((item.onChange !== undefined)) {
            // console.log('item.onChange', item.onChange);
            item.onChange(e, contexto);
        }

        if ((e.target.value === undefined) || (e.target.value === null)) {
            return;
        }

        const { name, value } = e.target;
        console.log(name, value);

        erros = null;
        const currentErrors = ValidacaoInput(item, name, value, erros);

        setErros(currentErrors);

        console.log('item', item);

        /*-------------------------------------------------------------------------------------------------------------- */
        OnChangeAplicacao(name, value, valoresFormulario, setValoresFormulario, contexto, contextoMestre);
        /*-------------------------------------------------------------------------------------------------------------- */

        //setValoresFormulario && setValoresFormulario(prevValues => ({ ...prevValues, [item.name]: value }));
        setValoresFormulario({ ...valoresFormulario, [name]: value });

        // Atualizar o estado com os valores novos

        console.log('valores', valoresFormulario);
    };


    let InputComponent;

    if (item.type == "TextoInput") InputComponent = TextoInput;
    if (item.type == "SelecaoInput") InputComponent = SelecaoInput;
    if (item.type == "NumeroInput") InputComponent = NumeroInput;
    if (item.type == "MascaraInput") InputComponent = MascaraInput;
    if (item.type == "CheckboxInput") InputComponent = CheckboxInput;
    if (item.type == "RadioButtonInput") InputComponent = RadioButtonInput;
    if (item.type == "CalendarioInput") InputComponent = CalendarioInput;
    if (item.type == "AreaTextoInput") InputComponent = AreaTextoInput;
    if (item.type == "LabelEditarInput") InputComponent = LabelEditarInput;
    if (item.type == "LabelInfoInput") InputComponent = LabelInfoInput;
    if (item.type == "PasswordInput") InputComponent = PasswordInput;
    if (item.type == "ArquivoInput") InputComponent = ArquivoInput;
    if (item.type == "CheckTextoInput") InputComponent = CheckTextoInput;
    if (item.type == "PossuiFilhosInput") InputComponent = PossuiFilhosInput;
    if (item.type == "TempoResidenciaInput") {
        if (valoresFormulario !== null) {
            // Garante que o valor seja um objeto
            if (typeof valoresFormulario['id_tipo_tempo_residencia_imigrante'] !== 'object' || valoresFormulario['id_tipo_tempo_residencia_imigrante'] === null) {
                valoresFormulario['id_tipo_tempo_residencia_imigrante'] = { tipo: "", subTipo: "" };
            }
        
            // Atualiza as propriedades tipo e subTipo
            valoresFormulario['id_tipo_tempo_residencia_imigrante'].tipo = valoresFormulario['id_tipo_tempo_residencia_imigrante'].tipo || "";
            valoresFormulario['id_tipo_tempo_residencia_imigrante'].subTipo = valoresFormulario['id_tipo_tempo_residencia_imigrante'].subTipo || "";
        }
        
             InputComponent = TempoResidenciaInput
        // };
    }
        if (item.type == "SimouNaoInput") {
            InputComponent = SimouNaoInput
            if (valoresFormulario !== null) {
                valoresFormulario[item?.name] = valoresFormulario[item.name] || false;
            }
        }

        //return (<>{renderJSON(item)}{renderJSON(valoresFormulario)}</>)

        return item.mostrarComponente == false ? null :
            (
                <InputComponent
                    key={item.mask ? `item-component-${item.mask}-${item.key}` : `item-component-${item.key}`}
                    label={item.label}
                    name={item.name}
                    value={valoresFormulario && valoresFormulario[item.name] || ''}
                    placeholder={item.placeholder}
                    onChange={handleInputChange}
                    // onBlur={handleInputOnBlur}
                    options={item.options}
                    numberModel={item.numberModel}
                    botoes={item.botoes}
                    max={item.max}
                    min={item.min}
                    mode={item.mode}
                    maskModel={item.mask}
                    apiUrl={item.apiUrl}
                    apiSchema={item.apiSchema}
                    error={erros && erros[item.name]}
                    setErrors={setErros}
                    disabled={item.disabled}
                    orientacoes={item.orientacoes}
                    analiseType={item.analiseType}
                    feedback={item.feedback}
                    tabela={item.tabela}
                    mensagemTooltip={item.mensagemTooltip}
                />
            )

    }
