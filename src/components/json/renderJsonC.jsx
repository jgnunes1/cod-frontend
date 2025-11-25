import React, { useState } from "react";

export function renderJSONC(data) {
  const [isTruncated, setIsTruncated] = useState(true);

  const handleCopy = () => {
    const json = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(json).then(
      () => console.log("JSON copiado com sucesso!"),
      () => console.warn("Erro ao copiar JSON.")
    );
  };

  const handleToggleTruncate = (truncate) => {
    setIsTruncated(truncate);
  };

  return (
    <div className="highlight">
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button className="copy-button" onClick={handleCopy}>
          Copiar
        </button>
        <button
          className="toggle-button"
          onClick={() => handleToggleTruncate(true)}
        >
          Curto
        </button>
        <button
          className="toggle-button"
          onClick={() => handleToggleTruncate(false)}
        >
          Completo
        </button>
      </div>
      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: highlightJSON(data, isTruncated),
          }}
        />
      </pre>
    </div>
  );
}

function highlightJSON(json, isTruncated) {
  // Converte o JSON em uma string formatada
  const jsonString = JSON.stringify(json, null, 2);

  // Aplica truncamento se necessário
  const truncatedJson = isTruncated
    ? jsonString.replace(
        /: "([^"]{256,})"/g,
        ': "<span class="string">TRUNCADO: ...</span>"'
      )
    : jsonString;

  // Adiciona classes para destacar os tipos de dados
  return truncatedJson
    .replace(/"([^"]+)":/g, '<span class="key">"$1"</span>:') // Chaves
    .replace(/: "([^"]*)"/g, ': <span class="string">"$1"</span>') // Strings
    .replace(/\b(true|false)\b/g, '<span class="boolean">$1</span>') // Booleanos
    .replace(/\b(null)\b/g, '<span class="null">$1</span>') // Null
    .replace(/\b(\d+)\b/g, '<span class="number">$1</span>'); // Números
}
