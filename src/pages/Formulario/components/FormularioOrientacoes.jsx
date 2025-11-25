import React from 'react';

const FormularioOrientacoes = () => {
    return (
        <section>
            <section className="sublinhado-dotted negrito orientacoes">
                <i className="pi pi-info-circle azul" style={{ fontSize: "1.5em", marginRight: "0.5em" }} />
                Orientações Gerais Sobre o Cadastro:
            </section>
            <p>
                Esta seção permite cadastrar e identificar informações faltantes sobre o Formulario.
                Além disso, é possível utilizá-la para atualizar dados que foram alterados, como endereço,
                telefone ou outras informações. Revise e preencha os campos obrigatórios para manter os registros atualizados.

                Não esqueça de confirmar o preenchimento dos dados, no botão <b><i className="pi pi-check" /> Finalizar Alterações</b>, ao final do formulário.
                {/* <i
                    className="pi pi-info-circle"
                    style={{ fontSize: "1rem", paddingLeft: "0.5%", color: "blue", cursor: "pointer" }}
                /> */}
            </p>
        </section>
    );
};

export default FormularioOrientacoes;
