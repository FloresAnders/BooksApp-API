import pool from "@/database/connection";
import { Author } from "@/root/types"; 
import { RowDataPacket } from 'mysql2/promise';
 
const getAll = async () => {
  const [rows] = await pool.promise().query('SELECT * FROM books',[]);
  return rows; 
};

const getById = async (id: number) => {
  const [rows] =await pool.promise().query("SELECT * FROM books WHERE id = ?", [id]);
  return rows; 
};

const getByAuthorId = async (id: number) => {
    const [rows] =await pool.promise().query("SELECT * FROM books WHERE authorId = ?", [id]);
    return rows; 
  };

const create = async (title: string) => {
  const [result] = await pool.promise().query("INSERT INTO books (name) VALUES (?)", [title]);

  const id = (result as RowDataPacket).insertId;
  return { id, title };
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
     const [result] = await pool.promise().query("DELETE FROM books WHERE id = ?", [id]);
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