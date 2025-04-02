import { Sequelize } from "sequelize";

const sequelize = new Sequelize("easy_movedb", "root", "Vishal@123", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");
  } catch (error) {
    console.error("Database connection error:", error);
  }
})();

export default sequelize;
