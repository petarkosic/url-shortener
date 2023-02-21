import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import urlRoutes from './routes/urlRoutes';

config();
const PORT = process.env.PORT || 5000;
const app: Express = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
	res.status(200).json({ message: 'Hello from router' });
});

app.use('/api', urlRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
