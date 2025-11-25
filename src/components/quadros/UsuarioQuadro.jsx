import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function UsuarioQuadro() {
  const contexto = useContext(AuthContext);
  function listar() {
    console.log(contexto);
  }

  function exibirNome(str) {
    if (!str) return "";
    return str.split(" ")[0];
  }
  function exibirIdUnico(str) {
    if (!str) return "";
    return str.substring(0, 3) + ".***.**" + str.substring(9, 10)+"-**";
  }

  return (
    <div className="p-2 usuario-quadro">
      <div className="d-flex flex-row text-nowrap dados_usuarios">
      {contexto?.usuario && (
        <>
          <div className="p-2">
            
            <p><i className="pi pi-user"></i>&nbsp;&nbsp;&nbsp;{contexto?.usuario && exibirNome(contexto?.usuario.nome_civil)}</p>
          </div>
          <div className="p-2 d-none d-md-block">
            
            <p><i className="pi pi-wallet"></i>&nbsp;&nbsp;&nbsp;{contexto?.usuario && exibirIdUnico(contexto.usuario.identificador)}</p>
          </div>
          <div className="p-2 d-none d-md-block">            
            <p><i className="pi pi-tag"></i>&nbsp;&nbsp;&nbsp;{contexto.usuario?.perfil}</p>
          </div>
        </>
      )}
      {/* <button onClick={listar}>a</button> */}
      </div>
    </div>
  );
}

export default UsuarioQuadro;
