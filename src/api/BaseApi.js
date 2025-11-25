import { BASE_API_URL, getHeaders } from "../configs/Env"

const url_base = BASE_API_URL

export function obtemDados(rota_base="") {

    return {
      url: `${url_base}/${rota_base}`,
    options:{
      method: 'GET',
      headers: getHeaders(),
    }
    }
}

export function obtem(id=0, rota_base="") {

  console.log//("obtem", id, rota_base);
    return {
      url: `${url_base}/${rota_base}/${id}`,
    options:{
      method: 'GET',
      headers: getHeaders(),
    }
    }
}

export function salva(item={}, rota_base="") {
  const url= `${url_base}/${rota_base}`;

  return {
    url: url,
    options:{
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(item)  // Adiciona o item ao corpo da solicitação
      },
    };
  }
  
export function edita(item={}, rota_base="") {
    console.log//("item:", item);
    return {
        url: `${url_base}/${rota_base}`,
        options:{
          method: 'PATCH',
          headers: getHeaders(),
          body: JSON.stringify(item)  // Adiciona o item ao corpo da solicitação
        },
      };
    }

export function apagaApi(item={}, rota_base="") {
        return {
            url: `${url_base}/${rota_base}`,
            options:{
              method: 'DELETE',
              headers: getHeaders(),
              body: JSON.stringify(item)  // Adiciona o item ao corpo da solicitação
            },
          };
}

export function obtemNome(id=1, rota_base="") {

  console.log//("obtem nome", id, rota_base);
    return {
      url: `${url_base}/${rota_base}/${id}/nome`,
    options:{
      method: 'GET',
      headers: getHeaders(),
    }
    }
}