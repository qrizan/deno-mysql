# deno-mysql
#### simple REST API


- setup database -> src/config/client.ts
```
client.connect({
    hostname: "hostname",
    username: "username",
    password: "password",
    db: ""
});
```


- running
```
$ denon start
```

- routes
```
POST /api/v1/todo/create
GET /api/v1/todos
GET /api/v1/todo/:uuid
PUT /api/v1/todo/:uuid
DELETE /api/v1/todo/:uuid
```
##### tested
![Alt text](preview/tested.png?raw=true "version")


##### preview

![Alt text](preview/created.png?raw=true "version")

![Alt text](preview/getall.png?raw=true "version")

![Alt text](preview/getbyuuid.png?raw=true "version")

![Alt text](preview/update.png?raw=true "version")

![Alt text](preview/delete.png?raw=true "version")