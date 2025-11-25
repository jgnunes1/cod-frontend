import { BASE_API_URL, getHeaders } from "../configs/Env"
export const BackendRequest = (
  uri = "",
  body = null,
  headers = {},
  method = "GET"
) => {
  const options = {
    method: method,
    headers: {
      ...getHeaders(),
      ...headers,
    },
  };

  const base = BASE_API_URL;
  const url = uri ? (uri.startsWith('http') ? uri : `${base}/${uri}`) : base;

  if (body) {
    options.body = JSON.stringify(body);
  }

  return { url, options };
};


export function login(corpo) {
  return {
    url: `${BASE_API_URL}/auth/login`,
    options:{
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(corpo)
    }
  }
}

export function logout() {
return {
  url: `${BASE_API_URL}/auth/logout`,
  options:{
      method: 'POST',
      headers: getHeaders(),
    },
  };
}


export function estaLogado() {
  const token = 'Bearer ' + window.localStorage.getItem("token")
  return {
    url: `${BASE_API_URL}/auth/listar`,
    options:{
        method: 'POST',
        headers: getHeaders()
      },
    };
  }
  