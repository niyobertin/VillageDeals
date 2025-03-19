import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import YAML from "yamljs";
import dotenv from "dotenv";
import appRoutes from "./routes";
dotenv.config();

const app = express();
const port = process.env.PORT || 4400;
const swaggerDocument = YAML.load("openapi.yaml");

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", appRoutes);

app.listen(port, () => {
  console.log(`Server connected to http://localhost:${port}`);
  console.log(`API docs are available at http://localhost:${port}/api-docs`);
});

export default app;
