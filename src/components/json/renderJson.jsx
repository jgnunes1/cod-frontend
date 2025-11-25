
export  function renderJSON( data ) {
  if (!data) return null;
  return (
    <pre className="highlight"
    style={{
      whiteSpace: "pre-wrap", // Quebra de linha para grandes strings
      wordWrap: "break-word", // Força a quebra de palavras longas
    }}
    >
      <code
        dangerouslySetInnerHTML={{
          __html: highlightJSON(data)
        }}
      />
    </pre>
  );
}

 function highlightJSON(json) {
    // Converte o JSON em uma string formatada
    json = JSON.stringify(json, null, 2);
  // Adiciona as classes para destacar os tipos de dados
  json = json.replace(/"([^"]+)":/g, '<span class="key">"$1"</span>:');    // Chaves
  json = json.replace(/: "([^"]*)"/g, ': <span class="string">"$1"</span>'); // Strings
  json = json.replace(/\b(true|false)\b/g, '<span class="boolean">$1</span>'); // Booleanos
  json = json.replace(/\b(null)\b/g, '<span class="null">$1</span>');       // Null
  json = json.replace(/\b(\d+)\b/g, '<span class="number">$1</span>');      // Números

  
    return json;
  }
  