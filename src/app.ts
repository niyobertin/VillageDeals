import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 4200;
const swaggerDocument = YAML.load('openapi.yaml');

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/health-check', (req:Request, res:Response) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to village deals api'
});
});

app.listen(port, () =>{
    console.log(`Server connected to http://localhost:${port}`);
    console.log(`API docs are available at http://localhost:${port}/api-docs`);
});

export default app;