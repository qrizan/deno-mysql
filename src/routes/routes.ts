import { Router } from "https://deno.land/x/oak/mod.ts";
import todoController from "../controllers/todo.ts";

const route = new Router();

route.get('/api/v1/', async ({
    response
}: {
    response: any;
}) => {
    response.status = 200;
    response.body = {
        message: 'REST API ( deno mysql )'
    }
});

route
  .post("/api/v1/todo/create", todoController.create)
  .get("/api/v1/todos", todoController.getAll)
  .get("/api/v1/todo/:uuid", todoController.getByUuid)
  .put("/api/v1/todo/:uuid", todoController.updateByUuid)
  .delete("/api/v1/todo/:uuid", todoController.deleteByUuid);

export default route;