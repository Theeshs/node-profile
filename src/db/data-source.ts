import { DataSource } from "typeorm";
import { Account } from "./entities/user";

const DB = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "thee",
    password: "1722@sajaniV@n",
    database: "profile",
    entities: [Account],
    migrations: ["src/db/migrations/*js"],
    logging: true,
    synchronize: true

})

export default DB