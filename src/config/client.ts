import { Client } from "https://deno.land/x/mysql/mod.ts";

// dbconfig
import { DATABASE, TABLE } from "./dbconfig.ts";

const client = await new Client();

client.connect({
    hostname: "hostname",
    username: "username",
    password: "password",
    db: ""
});

const run = async () => {
    await client.execute(`CREATE DATABASE IF NOT EXISTS ${DATABASE}`);
    await client.execute(`USE ${DATABASE}`);
    await client.execute(`DROP TABLE IF EXISTS ${TABLE.TODO}`);
    await client.execute(`
      CREATE TABLE ${TABLE.TODO} (
            id int(11) NOT NULL AUTO_INCREMENT,
            uuid varchar(36) NOT NULL,
            title varchar(50) NOT NULL,
            is_completed boolean NOT NULL default false,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);
};

run();

export default client;