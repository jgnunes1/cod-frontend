import { BASE_API_URL, getHeaders } from "../configs/Env";

/**
 * API para consumir endpoints de Servidor do backend
 */

/**
 * Lista todos os servidores
 * GET /servidor
 */
export function listarServidores() {
  return {
    url: `${BASE_API_URL}/servidor`,
    options: {
      method: "GET",
      headers: getHeaders(),
    },
  };
}

/**
 * Busca um servidor por matrícula
 * GET /servidor/{matricula}
 */
export function buscarServidorPorMatricula(matricula) {
  return {
    url: `${BASE_API_URL}/servidor/${matricula}`,
    options: {
      method: "GET",
      headers: getHeaders(),
    },
  };
}
