import React, { useContext, useEffect, useState } from "react";
import { APP_SIGLA, APP_VERSAO } from "../../configs/Env";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Dialog } from "primereact/dialog";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function Rodape({temasCss, temaCss, setTemaCss}) {
  const contexto = useContext(GlobalContext);
  const [visible, setVisible] = useState(false);

  const exibirDetalhesOnline = () => {
    return (
      <>
        Status: {contexto?.online ? "online" : "offline"}
        <hr />
        Aplicação: {contexto?.corpo.ambiente} <br />
        Ambiente: {contexto?.corpo.ambiente}
      </>
    );
  };

  const exibirDetalhesOffline = () => {
    return <>Você está offline e esses são os detalhes</>;
  };

  return (
    <footer>
      <div className="py-lg-2 px-lg-5 align-items-center mt-5 fixed-bottom text-light rodape">
        <div className="d-flex flex-sm-nowrap">
          <div className="p-2 flex-grow-1 small">
            UERJ DGTI - {APP_SIGLA} - versão: {APP_VERSAO} {contexto?.onLine ? " - online" : " - offline"}
          </div>

          <div className="p-2">
            <i
              className="pi pi-palette theme-icon"
              title="Alterar tema"
              onClick={() => {
                const nextIndex = (temasCss.findIndex(t => t.value === temaCss) + 1) % temasCss.length;
                setTemaCss(temasCss[nextIndex].value);
              }}
              style={{ cursor: "pointer", fontSize: "1rem" }}
            ></i>
          </div>

          <div className="p-2 small">
            <span onClick={() => setVisible(true)} className="mais">
              detalhes
            </span>
          </div>

          <Dialog
            header="Informações sobre sua conexão."
            visible={visible}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "175vw", "750px": "105vw" }}
            onHide={() => setVisible(false)}
            modal
          >
            <div>
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
              {contexto?.onLine ? exibirDetalhesOnline() : exibirDetalhesOffline()}
            </div>
          </Dialog>
        </div>
      </div>
    </footer>
  );
}

export default Rodape;
