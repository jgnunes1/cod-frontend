import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";

export default function CarregandoDialog({ visible, loteAtual = null, totalLotes = null }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;

    if (visible) {
      setSeconds(0); // Reseta o contador quando o diálogo é exibido
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000); // Incrementa a cada segundo
    } else {
      clearInterval(interval); // Para o contador quando o diálogo é fechado
    }

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, [visible]);

  return (
    <Dialog
      visible={visible}
      closable={false} // Remove o botão de fechar
      header="Carregando ..."
      footer={null} // Remove o rodapé
      style={{ width: "300px" }}
      modal
      onHide={() => {}}
    >
      <div className="flex align-items-center justify-content-center" style={{ height: "100px" }}>
      <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
      </div>
      <div style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>
        Tempo decorrido: {seconds} {seconds === 1 ? "segundo" : "segundos"}
      </div>
      {totalLotes > 1 && (
          <p>Lote {loteAtual} de {totalLotes}</p>
        )}
    </Dialog>
  );
}
