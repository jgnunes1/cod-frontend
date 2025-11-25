import Dexie from "dexie";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Tooltip } from "primereact/tooltip";
import React, { useEffect, useRef, useState } from "react";
import InfoTooltip from "../InfoTooltip";

// Configuração inicial do banco de dados Dexie
const db = new Dexie('ArquivosDB');

// Objeto global para acumular o esquema de tabelas
let schema = {};

export default function ArquivoInput({ label, name, type, value, onChange, onBlur, error, id, disabled, tabela, required, orientacoes = null, tamanho=1 }) {

    const [arquivos, setArquivos] = useState([]);
    const [arquivoAtual, setArquivoAtual] = useState(0);
    const arquivo = arquivos[arquivoAtual] || {};
    const [mostrarDialog, setMostrarDialog] = useState(false);
    const [erroValidacao, setErroValidacao] = useState(null);

    const baseOrientecoes = (
                    <section>
                        <strong>Orientações:</strong><br/>
                        No botão <b>Escolher Arquivo</b> você deve anexar documento comprobatório. Esse documento será analisado pela equipe responsável e depois que for aprovado, ele ficará disponível para consulta no botão <b><i className="pi pi-file"/>Documento  Salvo - {label}</b>. Antes de clicar em salvar vc pode clicar no botão com icone da <i className="pi pi-search"/> <b>lupa</b> para visualizar o arquivo.<br/>
                        <strong>Atenção:</strong> O arquivo só é enviado para análise quando você clicar no botão salvar. Somente arquivos <b>PDFs</b> são aceitos.<br/>
                        <strong>Importante:</strong> Enquando o documento é anlisado pela equipe responsável é possível consultar o status no botão <i className="pi pi-receipt"/> <b>Itens em Análise</b> na parte superior direita desse formulário.
                    </section>
    )

    useEffect(() => {
        setErroValidacao(error);
    }, [error]);

    useEffect(() => {
        const atualizarEsquema = async () => {
            if (!schema[tabela]) {
                schema[tabela] = 'id, nome, tipo, conteudo';

                // Fechar o banco para permitir adicionar nova versão
                if (db.isOpen()) {
                    db.close();
                }

                // Define a nova versão do banco com o esquema atualizado
                const novaVersao = db.verno + 1;
                db.version(novaVersao).stores(schema);

                // Abre o banco de dados com o novo esquema
                await db.open();
            }
            carregarArquivos();
        };

        atualizarEsquema();
    }, [tabela]);

    // Função para converter arquivo para Base64 e salvar no IndexedDB
    const handleFileChange = async (event) => {
        console.log("...alterando aquivo");
        const file = event.target.files[0];
        const maxSizeInBytes = tamanho * 1024 * 1024; // passado por parametro


        if (file) {
            console.log("Arquivo selecionado:", file.name, "Tamanho:", file.size);
            if (file.size > maxSizeInBytes) {
                console.log("Arquivo excede o limite.");
                setErroValidacao(`O arquivo excede o tamanho máximo permitido de ${tamanho} MB.`);
                event.target.value = ""; // Limpa o input
                return;
            } else {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const conteudoBase64 = reader.result.split(',')[1];

                    await db[tabela].put({
                        id: name,
                        nome: file.name,
                        tipo: name,
                        conteudo: conteudoBase64,
                    });

                    carregarArquivos();
                };
                reader.readAsDataURL(file);
            }
        }
        onChange && onChange(event);
    };

    const proximoArquivo = () => {
        setArquivoAtual((prev) => (prev + 1) % arquivos.length);
    };

    const arquivoAnterior = () => {
        setArquivoAtual((prev) =>
            prev === 0 ? arquivos.length - 1 : prev - 1
        );
    };

    const carregarArquivos = async () => {
        const dados = await db[tabela].toArray();
        setArquivos(dados);
    };

    const handleOnBlur = () => {

        if (required && !arquivo.conteudo) {
            setErroValidacao("O campo é obrigatório");
        } else {
            setErroValidacao("");
        }
    }

    return (
        <>
            <div className="d-flex align-items-center" style={{ display: "flex", height: "100%", overflow: "hidden" }}>
                <div className="campo w-100" id={id}>
                    <label><strong style={{fontSize:"1.2rem"}}>{label}&nbsp;</strong>
                        <InfoTooltip
                            id={`Tooltip_${name}`}
                            mensagem={"O arquivo deve ser no formato PDF e ter no máximo 1Mb."}
                        />
                    </label>
                    <input
                        type="file"
                        name={name}
                        onChange={(event) => handleFileChange(event)}
                        onBlur={handleOnBlur}
                        accept=".pdf"
                    />
                    
                    {orientacoes ? orientacoes : baseOrientecoes}
                </div>
                <div>
                    <Button
                        className="d-inline-flex m-2"
                        onClick={(e) => { e.preventDefault(); setMostrarDialog(true) }}
                        icon="pi pi-search"
                        disabled={!arquivo.conteudo}
                        tooltip={'Visualizar arquivo'}
                    />
                </div>


                <Dialog
                    header={arquivo.nome || 'Visualizar Arquivo'}
                    visible={mostrarDialog}
                    style={{ width: '95vw', height: '95vh' }}
                    onHide={() => setMostrarDialog(false)}
                    modal
                >
                    {arquivo.conteudo ? (
                        <iframe
                            title={arquivo.nome}
                            src={`data:application/pdf;base64,${arquivo.conteudo}`}
                            style={{ width: '100%', height: '90%', border: 'none' }}
                        />
                    ) : (
                        <p>Nenhum arquivo disponível para visualização.</p>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        {arquivos.length > 1 && (
                            <>
                                <Button onClick={arquivoAnterior} disabled={arquivos.length === 0}>
                                    Anterior
                                </Button>
                                <Button onClick={proximoArquivo} disabled={arquivos.length === 0}>
                                    Próximo
                                </Button>
                            </>
                        )}
                    </div>
                </Dialog>
            </div >
            <small> {erroValidacao && <p>{erroValidacao}</p>}</small>
        </>

    );
}
