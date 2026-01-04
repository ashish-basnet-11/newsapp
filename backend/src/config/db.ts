import { DataSource } from "typeorm";


const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "news_user",
    password: "ashish123",
    database: "news_db",
    logging: true,
    synchronize: true,
    entities: ["src/Entities/**/*.ts"]

})

export default AppDataSource;