import { DataSource } from "typeorm";
import { Skills } from "./entities/skills";
import { Account } from "./entities/user";
import { UserSkills } from "./entities/userSkills";

const DB = new DataSource({
    type: "postgres",
    host: "0.0.0.0",
    port: 5432,
    username: "postgres",
    password: "mysecretpassword",
    database: "profile",
    entities: [UserSkills, Account, Skills],
    migrations: ["src/db/migrations/*js"],
    logging: true,
    synchronize: true

})

export default DB