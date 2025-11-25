import { BASE_API_URL, getHeaders } from "../../../configs/Env";
export function LOGIN() {
  return {
    url: `${BASE_API_URL}/pessoa/listar`,
    options: {
      method: "GET",
      headers: getHeaders(),
    },
  };
}
