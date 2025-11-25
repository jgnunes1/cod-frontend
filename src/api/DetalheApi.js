import { BASE_API_URL, getHeaders } from "../configs/Env"

const url_base = BASE_API_URL


export function obtemDetalhe(id_mestre=0, rota_base="") {
  return {
    url: `${url_base}/${rota_base}/detalhe/${id_mestre}`, 
  options:{
    method: 'GET',
    headers: getHeaders(),
  }
  }
}

export function obtemPor(coluna="",id=0, rota_base="") {
  const url = `${url_base}/${rota_base}/por/${coluna}/${id}`;
  console.log(url);
  return {
    url: url,
    options:{
        method: 'GET',
        headers: getHeaders(),
    }
  }
}
