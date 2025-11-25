import { BASE_API_URL, getHeaders } from "../../../configs/Env";

export function OBTER_CONEXAO() {
  //console.log(token);
  return {
    url: `${BASE_API_URL}`,
    options: {
      method: "GET",
      headers: getHeaders(),
    },
  };
}
