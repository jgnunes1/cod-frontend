import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { obterTodosOsDados } from "../../../hooks/useDexie";
import PDFUploadButton from '../../shared/components/PDFUploadButton';
import Dexie from "dexie";

const db = new Dexie('ArquivosDB');
db.version(1).stores({
    dadosPessoais: 'nome,conteudo'
});

const DeficienciaDialog = ({ isVisible, setIsVisible, data = null, onSave = null, setDeficienciaChecked = null }) => {
/*     const [deficiencias, setDeficiencias] = useState([]);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const dados = await obterTodosOsDados("ReposTipos", "tipo_deficiente");
                setDeficiencias(dados); // Atualiza o estado com os dados
            } catch (error) {
                console.error("Erro ao obter dados do IndexedDB:", error);
            }
        };
        fetchDados(); // Chama a função ao carregar o componente
    }, []); */

   // console.log('deficienciasSalvas', data);

    const [selectedDeficiencias, setSelectedDeficiencias] = useState(
       data?.dados?.dados ? data?.dados?.dados.map((deficiencia) => deficiencia.tipo) : []
    );

    const [item, setItem] = useState(
        data?.dados?.dados ? data?.dados?.dados.reduce((acc, deficiencia) => ({ ...acc, [deficiencia.tipo]: deficiencia.observacao }), {}) : {}
    ); // Armazena descrições específicas para cada deficiência
    
    const [errors, setErrors] = useState({ deficiencias: null, arquivo: null });

    const deficiencias = [
        { id_tipo_deficiente: 1, tipo: "auditiva", nome: 'Deficiência Auditiva', descricao: 'Perda parcial ou total das possibilidades auditivas sonoras, variando em graus e níveis, podendo ser de um ou ambos os ouvidos.' },
        { id_tipo_deficiente: 2, tipo: "fisica", nome: 'Deficiência Física', descricao: 'Alteração completa ou parcial de um ou mais segmentos do corpo humano, acarretando o comprometimento da função física, apresentando-se sob a forma de paraplegia, paraparesia, monoplegia, monoparesia, tetraplegia, tetraparesia, triplegia, triparesia, hemiplegia, hemiparesia, amputação ou ausência de membro, paralisia cerebral, nanismo, membros com deformidade congênita ou adquirida.' },
        { id_tipo_deficiente: 3, tipo: "intelectual", nome: 'Deficiência Intelectual', descricao: 'Funcionamento intelectual significativamente inferior à média, com manifestação antes dos dezoito anos e limitações associadas a duas ou mais áreas de habilidades adaptativas.' },
        { id_tipo_deficiente: 4, tipo: "mental", nome: 'Deficiência Mental', descricao: 'Funcionamento intelectual significativamente inferior à média, com manifestação antes dos dezoito anos e limitações associadas a duas ou mais áreas de habilidades adaptativas.' },
        { id_tipo_deficiente: 5, tipo: "visual", nome: 'Deficiência Visual', descricao: 'Cegueira: acuidade visual igual ou menor que 0,05 no melhor olho, com a melhor correção óptica.' },
        { id_tipo_deficiente: 6, tipo: "infoCota", nome: 'infoCota', descricao: 'Informar se o trabalhador deve ser contabilizado no preenchimento de cota de pessoas com deficiência habilitadas ou de beneficiários reabilitados.' },
        { id_tipo_deficiente: 7, tipo: "reabilitado", nome: 'Reabilitado/Readaptado', descricao: 'Reabilitado: estando o empregado incapacitado parcial ou totalmente para o trabalho, cumpriu programa de reabilitação profissional no INSS, recebendo certificado e sendo proporcionados os meios indicados para participar do mercado de trabalho.' },
    ];

    const handleCheckboxChange = (deficiencia) => {
       // console.log(deficiencia);
        if (selectedDeficiencias.includes(deficiencia.tipo)) {
            setSelectedDeficiencias((prev) => prev.filter((tipo) => tipo !== deficiencia.tipo));
            setItem((prev) => {
                const updated = { ...prev };
                delete updated[deficiencia.tipo];
                return updated;
            });
        } else {
            setSelectedDeficiencias((prev) => [...prev, deficiencia.tipo]);
        }
    };

    const handleDescriptionChange = (tipo, value) => {
        setItem((prev) => ({ ...prev, [tipo]: value }));
    };

    async function buscarArquivos(databaseName, tabela) {
        const arquivos = await obterTodosOsDados(databaseName, tabela);
        return arquivos;
    }

    const handleFechar = () => {
        setIsVisible(false);
        setDeficienciaChecked(false);
    };

    const salvar = async (e) => {
        // Resetando erros
        setErrors({});
        let validationErrors = {};

        // Verificar se pelo menos uma deficiência foi selecionada
        if (selectedDeficiencias.length === 0) {
            validationErrors.deficiencias = "Selecione pelo menos uma deficiência.";
            setErrors(validationErrors);
            return;
        }

        try {
            const retorno = await db['dadosPessoais'].get("deficiencias");
            if (!retorno) {
                validationErrors.arquivo = "O arquivo não foi selecionado. Por favor, selecione o arquivo antes de continuar.";
                renderErrors(validationErrors);
                return;
            }
           // console.log("arquivo", retorno, validationErrors);
            // Monta o array com as deficiências selecionadas e suas descrições
            const deficienciasSelecionadas = selectedDeficiencias.map((tipo) => ({
                "id_tipo_deficiente": deficiencias.find((deficiencia) => deficiencia.tipo === tipo).id_tipo_deficiente,
                "tipo": tipo,
                "nome": deficiencias.find((deficiencia) => deficiencia.tipo === tipo).nome,
                "observacao": item[tipo] || '', // Detalhe inserido no InputTextarea
            }));
            // Monta o JSON final
            const formulario = {
                dados: deficienciasSelecionadas,
            };

            // Se houver erros, atualizar o estado e parar o fluxo
           // console.log('JSON Gerado:', formulario);
            renderErrors(validationErrors);

            if (onSave) {
                onSave(formulario); // Callback com os dados gerados
            }
            setIsVisible(false); // Fecha o modal após salvar
        } catch (erro) {
            console.error('Erro ao salvar:', erro);
            validationErrors.arquivo = "Erro ao validar o arquivo. Tente novamente.";
            renderErrors(validationErrors);
        }
    };

    const renderErrors = (errors) => {
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
    }

    const footer = (
        <div>
            <Button
                label="Fechar"
                icon="pi pi-times"
                className="p-button-secondary"
                style={{ marginRight: '0.25em' }}
                onClick={handleFechar}
            />
            <Button
                label="Salvar"
                icon="pi pi-check"
                onClick={salvar}
                className="p-button-success"
            />
        </div>
    );

    return (
        <Dialog
            header="Informações de Deficiência"
            visible={isVisible}
            style={{ width: '70vw' }}
            footer={footer}
            modal
            onHide={handleFechar}
        >
            <div>
                <h3>Selecione as opções aplicáveis de acordo com o laudo médico:</h3>
                <form onSubmit={salvar}>
                    {deficiencias.map((deficiencia) => (
                        <div key={deficiencia.tipo} style={{ marginBottom: '1rem' }}>
                            <Checkbox
                                inputId={`checkbox_${deficiencia.tipo}`}
                                value={deficiencia.tipo}
                                onChange={() => handleCheckboxChange(deficiencia)}
                                checked={selectedDeficiencias.includes(deficiencia.tipo)}
                                style={{ marginRight: '0.5rem' }}
                            />
                            <label htmlFor={`checkbox_${deficiencia.tipo}`} style={{ fontWeight: 'bold' }}>
                                {deficiencia.nome}
                            </label>
                            <p style={{ marginLeft: '2rem' }}>{deficiencia.descricao}</p>
                            <small> {errors.deficiencias && <p>{errors.deficiencias}</p>}</small>
                            {selectedDeficiencias.includes(deficiencia.tipo) && (
                                <InputTextarea
                                    name={`descricao_${deficiencia.tipo}`}
                                    value={item[deficiencia.tipo] || ''}
                                    onChange={(e) => handleDescriptionChange(deficiencia.tipo, e.target.value)}
                                    rows={3}
                                    cols={50}
                                    placeholder={`Observação sobre ${deficiencia.nome}...`}
                                    style={{ marginTop: '0.5rem', marginLeft: '2rem', width: '90%' }}
                                />
                            )}
                            <hr />
                        </div>
                    ))}
                </form>

                {/* Renderizar InputText condicionalmente */}
                {selectedDeficiencias.length > 0 && (
                    <div style={{ marginTop: '2rem' }}>
                        <small> {errors?.arquivo && <p>{errors.arquivo}</p>}</small>
                        <PDFUploadButton obrigatorio={true} nome="deficiencias" rotulo="Identidade" />
                    </div>
                )}
            </div>
        </Dialog>
    );
};

export default DeficienciaDialog;
