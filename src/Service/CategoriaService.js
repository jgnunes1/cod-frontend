import axios from "axios";

export const CategoriaService = async (categoria):Promise<any> => {
  return await  axios.post("http://localhost:8080/api/v1.0/categorias", categoria);
}   

export const deleteCategoriaService = async (id):Promise<any> => {
  return await  axios.delete(`http://localhost:8080/api/v1.0/categorias/${id}`);
}   

export const getCategoriasService = async ():Promise<any> => {
  return await  axios.get("http://localhost:8080/api/v1.0/categorias");
}   

export const getCategoriaByIdService = async (id):Promise<any> => {
  return await  axios.get(`http://localhost:8080/api/v1.0/categorias/${id}`);
}   

export const updateCategoriaService = async (id, categoria):Promise<any> => {
  return await  axios.put(`http://localhost:8080/api/v1.0/categorias/${id}`, categoria);
}