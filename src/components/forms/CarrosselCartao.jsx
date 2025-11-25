import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import ExibirDetalhamento from "../../hooks/ExibirDetalhamento";
import PerguntaDialog from "../dialog/PerguntaDialog";
import InfoDialog from "../dialog/InfoDialog";
import Orientacoes from "../../pages/Formulario/components/Orientacoes";

const CarrosselCartao = ({
    itens = [],
    contexto = null,
    contextoMestre = null,
    spec = null,
    titulo = "Item",
    FormComponente = null, // Componente do formulário para edição
    campoExibicao = "nome", // Campo exibido no título do diálogo
    template = null,
}) => {
    const [visualizarDialog, setVisualizarDialog] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogType, setDialogType] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [perguntaDialogVisible, setPerguntaDialogVisible] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [resposta, setResposta] = useState(null);
    const [item, setItem] = useState(null);

    const [dialogMensagemVisible, setDialogMensagemVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const styleButton = { padding: "0.5em", margin: "0.5em" };

    useEffect(() => {
        if (resposta) apagar(item);
        else setItem(null);
    }, [resposta]);


    const handleMensagem = (mensagem) => {
        console.log('dialog', mensagem);
        if (mensagem == "Dados Exibidos com Sucesso") {
            setDialogMensagemVisible(false); // Mostra o modal
            return;

        }
        setDialogMessage(mensagem);
        setDialogMensagemVisible(true); // Mostra o modal
    }

    const salvar = (item) => {
        item.id_pessoa ??= contextoMestre?.id_formulario; // Define o ID da pessoa se não estiver definido
        contexto?.salvar(item);

        //setDialogVisible(false);
    };

    const editar = (item) => {
        contexto?.editar(item);
        //setDialogVisible(false);
    };

    const apagar = (item) => {
        contexto?.apagar(item);
    };

    const handleDialog = (type, item = null) => {
        setSelectedItem(item);
        setDialogType(type);
        setDialogVisible(true);
    };

    const fecharDialogo = () => {
        setDialogVisible(false);
        setSelectedItem(null);
        setDialogType("");
    };

    const handleClickExcluir = (item) => {
        setItemToDelete(item);
        setPerguntaDialogVisible(true);
        setItem(item);
    };

    const itemTemplate = (item) => (
        <div key={item.id} className="cartao">
            <div className="cartao-titulo">{item.nome ?? titulo}</div>
            <div className="cartao-corpo">
                {template == null ? <ExibirDetalhamento json={item} spec={spec} /> : template(item)}
                <section>
                    {["Exibir", "Editar", "Remover"].map((acao) => (
                        <Button
                            key={acao}
                            label={acao}
                            icon={`pi pi-${acao === "Exibir" ? "eye" : acao === "Editar" ? "pencil" : "trash"}`}
                            onClick={() =>
                                acao === "Exibir"
                                    ? handleDialog("exibir", item)
                                    : acao === "Editar"
                                        ? handleDialog("editar", item)
                                        : handleClickExcluir(item)
                            }
                            style={styleButton}
                        />
                    ))}
                </section>
            </div>
        </div>
    );

    const responsiveOptions = [
        { breakpoint: "1280px", numVisible: 3, numScroll: 1 },
        { breakpoint: "1024px", numVisible: 2, numScroll: 1 },
        { breakpoint: "600px", numVisible: 1, numScroll: 1 },
    ];

    return (
        <>
            {spec.orientacao &&
                <div style={{ marginBottom: "1%" }}><Orientacoes titulo={spec.orientacao.titulo} texto={spec.orientacao.texto} /></div>}
            <div className="colunas-20-80">
                <div>
                    <Button label={`Novo ${titulo}`} onClick={() => handleDialog("editar")} />
                </div>
                <div>
                    {/* <strong>Orientações:</strong><br />
                    <section>
                        Nessa sessão do formulário você pode cadastrar e editar itens relacionados ao <b>{titulo}</b>. Os itens são exibidos abaixo em forma de cartão. Cada cartão possui botões para <i className='pi pi-eye'></i> <b>Exibir</b>, <i className='pi pi-pencil'></i> <b>Editar</b>. <br />Para cadastrar um novo item, clique no botão <i className='pi pi-plus'></i> <b>Novo {titulo}</b>. Para editar um item, clique no botão <i className='pi pi-pencil'></i> <b>Editar</b>.
                    </section> */}
                </div>
            </div>
            <hr />

            <Carousel
                value={Array.isArray(itens) ? itens : []}
                itemTemplate={itemTemplate}
                numVisible={3}
                numScroll={1}
                responsiveOptions={responsiveOptions}
            />

            {dialogType === "exibir" && selectedItem && (
                <Dialog
                    header={`Detalhes do ${titulo}`}
                    visible={dialogVisible}
                    style={{ width: "50vw" }}
                    onHide={fecharDialogo}
                >
                    <ExibirDetalhamento json={selectedItem} spec={spec} />
                </Dialog>
            )}

            {dialogType === "editar" && (
                <FormComponente
                    titulo={titulo}
                    spec={spec}
                    item={selectedItem}
                    setItem={setSelectedItem}
                    salvar={salvar}
                    editar={editar}
                    visible={dialogVisible}
                    setVisible={setDialogVisible}
                    contexto={contexto}
                />
            )}


            <PerguntaDialog
                titulo={`Confirmação de Exclusão`}
                visible={perguntaDialogVisible}
                setVisible={setPerguntaDialogVisible}
                resposta={resposta}
                setResposta={setResposta}
                botoes={{ rejeita: "Cancelar", aceita: "Excluir" }}
            >
                Tem certeza de que deseja excluir este {titulo}{" "}
                {itemToDelete?.[campoExibicao] && <strong>{itemToDelete[campoExibicao]}</strong>}?
            </PerguntaDialog>

            {/* <InfoDialog
                titulo={'Informação'}
                visible={dialogMensagemVisible}
                setVisible={setDialogMensagemVisible}
                style={{ width: "40vw" }}
            >
                <p>{dialogMessage}</p>
            </InfoDialog> */}
        </>
    );
};

export default CarrosselCartao;
