export const APP_SIGLA = import.meta.env.VITE_APP_SIGLA || "UNIDADE";
export const APP_NOME_COMPLETO = import.meta.env.VITE_APP_NOME_COMPLETO || "Sistema Unidade  - Desenvolvimento Local";
export const APP_VERSAO = import.meta.env.VITE_APP_VERSAO || "1.0.0";
export const APP_CONTATO = import.meta.env.VITE_APP_CONTATO || "atendimento.dgti@uerj.br";

// Base URL do backend. Configure via VITE_APP_URL_BACKEND nos arquivos .env (ex: VITE_APP_URL_BACKEND=http://localhost:8080)
// NOTE: não inclua a rota "/api" aqui — use APP_VERSAO_ROTA_PADRAO para compor a rota base completa.
export const APP_URL_BACKEND = import.meta.env.VITE_APP_URL_BACKEND || "http://localhost:8080";

// Por compatibilidade com vários backends, por padrão usaremos a rota 'api' (ex.: http://host:8080/api)
export const APP_VERSAO_ROTA_PADRAO = import.meta.env.VITE_APP_VERSAO_ROTA_PADRAO || "api";
export const APP_SCHEMA_ROTA_REPO = import.meta.env.VITE_APP_SCHEMA_ROTA_REPO || "repo";
export const APP_SCHEMA_ROTA_TIPO = import.meta.env.VITE_APP_SCHEMA_ROTA_TIPO || "tipos";

// URL base já composta com a versão/namespace da API
export const BASE_API_URL = `${APP_URL_BACKEND}/${APP_VERSAO_ROTA_PADRAO}`;

// Função que sempre lê o token atual do localStorage e retorna headers atualizados.
// Isso evita que o token fique preso no momento da importação.
export function getHeaders(extra = {}) {
  let token = '';
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const t = window.localStorage.getItem('token');
      if (t) token = `Bearer ${t}`;
    }
  } catch (e) {
    // ambiente sem window (SSR/testes) — ignore
  }

  const base = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) base.Authorization = token;

  return { ...base, ...extra };
}
