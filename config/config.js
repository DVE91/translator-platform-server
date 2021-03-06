require("dotenv").config();
module.exports = {
  development: {
    url: process.env.DATABASE_URL_DEV,
    dialect: "postgres",
    operatorAliases: "0",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    use_env_variable: "DATABASE_URL",
  },
};
