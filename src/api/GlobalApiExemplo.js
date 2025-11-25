import { BASE_API_URL, getHeaders } from "../configs/Env"

export function verificaConexo() {
    return {
      url: `${BASE_API_URL}`,
      options:{
          method: 'GET',
          headers: getHeaders(),
      }
    }
}