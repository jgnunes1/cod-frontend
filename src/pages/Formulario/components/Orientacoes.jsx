import React from 'react';

const Orientacoes = ({ titulo = null, texto = null }) => {
    // Os parametros/props devem ser passados da seguinte forma onde o componente Orientacoes for utilizado:
    // <Orientacoes titulo="titulo" texto={["texto1", "texto2", "texto3"]} />, onde titulo é uma string e texto é um array de strings. 
    // Isso teve quer ser feito para que códigos HTML e React pudessem ser lidos e renderizados corretamente.
    // Caso exista um código HTML/React dentro do texto, ele deve ser inserido separado como um item do array.
    // Exemplo: <Orientacoes titulo="titulo" texto={["texto1", <b key="i"><i className="pi pi-check"></i> Item</b>, "texto2", <p>texto3</p>]} />
    // Não esquecer de definir uma chave caso tenha item de React no array.
    return (
        <section>
            <section className="sublinhado-dotted negrito orientacoes">
                <i className="pi pi-info-circle azul" style={{ fontSize: "1.5em", marginRight: "0.5em" }} />
                {titulo}:
            </section>
            <p>
                {texto.map((cadaParte, index) => (
                    <React.Fragment key={index}>{cadaParte}</React.Fragment>
                ))}
            </p>
        </section>
    );
};

export default Orientacoes;
