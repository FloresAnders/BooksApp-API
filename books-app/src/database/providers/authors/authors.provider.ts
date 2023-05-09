import pool from "@/database/connection";
import { Author } from "@/root/types"; 
import { RowDataPacket } from 'mysql2/promise';
 
const getAll = async () => {
  const [rows] = await pool.promise().query('SELECT * FROM authors',[]);
  return rows; 
};

const getById = async (id: number) => {
  const [rows] =await pool.promise().query("SELECT * FROM authors WHERE id = ?", [id]);
  return rows; 
};

const create = async (name: string) => {
  const [result] = await pool.promise().query("INSERT INTO authors (name) VALUES (?)", [name]);

  const id = (result as RowDataPacket).insertId;
  return { id, name };
};

const updateById = async (id: number, entity: Author) => {
  console.log("updateById");
  const entityFound = await getById(id);
  if (entityFound && entityFound.length < 0) { 
    console.log("entityFound");
     const [result] = await pool.promise().query("UPDATE authors SET name = ? WHERE id = ?", [entity.name, id]);
   
    console.log("result",result);
    return result;
  }
  throw new Error("Author not found");
};

const deleteById = async (id: number) => {
  const entityFound = await getById(id);
  console.log("entityFound",entityFound);
  
  if (entityFound && entityFound.length > 0) { 
     const [result] = await pool.promise().query("DELETE FROM authors WHERE id = ?", [id]);
    return result;
  }
  throw new Error("Author not found"); 
};

export const authorsProvider = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};

export default authorsProvider;