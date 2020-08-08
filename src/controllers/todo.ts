import { v4 } from "https://deno.land/std/uuid/mod.ts";
import TodoModel from "../models/todo.ts";

const create = async (
    { request, response }: { 
        request: any; 
        response: any 
    }
) => {
    const body = await request.body(true).value;
    if (!request.hasBody) {
        response.status = 400;
        response.body = {
            success: false,
            message: "No data"
        };
        return;
    }

    try {
        await TodoModel.create({ 
            title: body.title, 
            is_completed: false 
        });
        response.body = {
            success: true,
            message: "Success"
        };
    } catch (error) {
        response.status = 400;
        response.body = {
            success: false,
            message: error
        };
    }      
}

const getAll = async (
    { response }: { 
        response: any 
    }
) => {
    try {
        const data = await TodoModel.getAll();
        response.status = 200;
        response.body = {
            success: true,
            data
        };
    } catch (error) {
        response.status = 400;
        response.body = {
            success: false,
            message: error
        };
    }
}

const getByUuid = async (
    { params, response }: { 
        params: { uuid: string }; 
        response: any 
    }
) => {

    const isValid = v4.validate(params.uuid);
    if (!isValid) {
        response.status = 400;
        response.body = {
            success: false,
            message: "UUID is not valid"
        };
        return;
    }

    try {
        const isAvailable = await TodoModel.doesExistByUuid({ uuid: params.uuid});
        if (!isAvailable) {
            response.status = 404;
            response.body = {
                success: false,
                message: "Not found"
            };
            return;
        }

        const todo = await TodoModel.getByUuid({ uuid: params.uuid });
        response.status = 200;
        response.body = {
            success: true,
            data: todo
        };

    } catch (error) {
        response.status = 400;
        response.body = {
            success: false,
            message: error
        };
    }        
}

const updateByUuid = async (
    { params, request, response }: { 
        params: { uuid: string }; 
        request: any; 
        response: any; 
    }        
) => {

    const isValid = v4.validate(params.uuid);        
    if (!isValid) {
        response.status = 400;
        response.body = {
            success: false,
            message: "UUID not valid"
        };
        return;
    }

    try {
        const isAvailable = await TodoModel.doesExistByUuid({ uuid: params.uuid });
        if (!isAvailable) {
            response.status = 404;
            response.body = {
                success: false,
                message: "No todo found",
            };
            return;
        }
    
        const body = await request.body(true).value;
        const updatedRows = await TodoModel.updateByUuid({
            uuid: params.uuid,
            ...body,
        });

        response.status = 200;
        response.body = {
            success: true,
            message: `Success ${updatedRows}`,
        };

    } catch (error) {
        response.status = 400;
        response.body = {
            success: false,
            message: error
        };
        }        
}

const deleteByUuid = async (
    { params, response }: { params: { uuid: string }; response: any }
) => {
    const isValid = v4.validate(params.uuid);        
    if (!isValid) {
        response.status = 400;
        response.body = {
            success: false,
            message: "UUID not valid"
        };
        return;
    }

    try {
        const deletedRows = await TodoModel.deleteByUuid({
            uuid: params.uuid,
        });
        response.status = 200;
        response.body = {
            success: true,
            message: `Success ${deletedRows}`,
        };
    } catch (error) {
        response.status = 400;
        response.body = {
            success: false,
            message: error
        };
    }        
}

export default {
    create,
    getAll,
    getByUuid,
    updateByUuid,
    deleteByUuid
};