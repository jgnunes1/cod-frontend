export function obtemDetalhe(id_mestre = 0, rota_base = "", jsonFake) {
  console.log('jsonfake', jsonFake);
  const jsonFiltrado = jsonFake.filter(item => item.id_pessoa === id_mestre);

  return jsonFiltrado;
}

export function obtemTodos(rota_base="",jsonFake) {
  return jsonFake;
}

export function obtem(id = 0, rota_base = "",jsonFake) {
  console.log('idpessoa', id)
  const jsonFiltrado = jsonFake.find(item => item.id === id);

  return jsonFiltrado;
}

export function obtemPor(coluna="",id=0, rota_base="", jsonFake) {
  const jsonFiltrado = jsonFake.find(item => item[coluna] === id);

  return jsonFiltrado;
}

export function salva(item = null, rota_base = "", jsonFake) {
  const id = jsonFake.length + 1;
  jsonFake.push({ id: id, id_pessoa: jsonFake[0].id_pessoa, ...item });

  console.log('novo retorno', jsonFake)
  return jsonFake;
}

export function edita(item = {}, rota_base = "",jsonFake) {
  console.log("item:", item);

  jsonFake = apagaApi(item);
  jsonFake = salva(item);

  console.log("item:", jsonFake);
  return jsonFake;
}

export function apagaApi(item = {}, rota_base = "", jsonFake) {
  console.log('id a deletar ', item.id)
  jsonFake = jsonFake.filter(itemJson => itemJson.id !== item.id);

  return jsonFake;

}
