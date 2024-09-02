import 'dotenv/config'
import express from "express";
import cors from "cors";
import mainRouter from './routes/mainRoute.js';


const app = express();
app.use(cors());
app.use(express.json());




// route
app.use('/api/v1', mainRouter);

// server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is Running at : ${PORT}`);
});
