import { DataSource } from "typeorm";
import { User } from "../Entities/User.js";
import { Article } from "../Entities/Article.js";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "news_user",
    password: "ashish123",
    database: "news_db",
    logging: true,
    synchronize: true,
    entities: [User, Article]

})

export default AppDataSource;