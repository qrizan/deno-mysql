import { v4 } from "https://deno.land/std/uuid/mod.ts";
import client from "../config/client.ts";
import { TABLE } from "../config/dbconfig.ts";
import Todo from "../interfaces/Todo.ts";

const create = async ({ title, is_completed }: Todo) => {
    // Generate a v4 uuid
    const uuid = v4.generate();        
    return await client.query(
        `INSERT INTO ${TABLE.TODO}(uuid, title, is_completed) values(?, ?, ?)`,
        [
            uuid,
            title,
            is_completed,
        ],
    );        
}

const getAll = async () => {
    return await client.query(`SELECT uuid, title, is_completed, created_at, updated_at FROM ${TABLE.TODO}`);
}

const doesExistByUuid = async ({ uuid }: Todo) => {
    const [result] = await client.query(
        `SELECT COUNT(*) count FROM ${TABLE.TODO} WHERE uuid = ? LIMIT 1`,
        [uuid],
    );
    return result.count > 0;
}

const getByUuid = async ({ uuid }: Todo ) => {
    return await client.query(
        `SELECT uuid, title, is_completed, created_at, updated_at FROM ${TABLE.TODO} WHERE uuid = ?`,
        [uuid],
    );
}

const updateByUuid = async ({ uuid, title, is_completed }: Todo) => {
    const result = await client.query(
        `UPDATE ${TABLE.TODO} SET title=?, is_completed=? WHERE uuid=?`,
        [
            title,
            is_completed,
            uuid,
        ],
    );
    
    //  count of rows
    return result.affectedRows;           
}

const deleteByUuid = async ({ uuid }: Todo) => {
    const result = await client.query(
        `DELETE FROM ${TABLE.TODO} WHERE uuid = ?`,
        [uuid],
    );

    //  count of rows
    return result.affectedRows;        
}

export default {
    create,
    getAll,
    doesExistByUuid,
    getByUuid,
    updateByUuid,
    deleteByUuid
};