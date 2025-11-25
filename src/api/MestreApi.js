import { BASE_API_URL, getHeaders } from "../configs/Env"

const url_base = BASE_API_URL

export function obtemTodos(rota_base="") {
  //console.log("obtemTodos", rota_base);
    return {
      url: `${url_base}/${rota_base}/todos`,
    options:{
      method: 'GET',
      headers: getHeaders(),
    }
    }
}


export function obtemLista(rota_base="") {
  console.log("obtemLista", rota_base);
    return {
      url: `${url_base}/${rota_base}/lista`,
    options:{
      method: 'GET',
      headers: getHeaders(),
    }
    }
}
