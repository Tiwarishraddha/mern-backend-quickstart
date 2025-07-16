import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import sampleRoutes from './routes/sampleRoute.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/sample', sampleRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
