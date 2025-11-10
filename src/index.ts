import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source.ts";
import { userRouter, authRouter, adRouter, categoryRouter } from "./routes/index.ts";
import cors from "cors";
import cookieParser from "cookie-parser";


dotenv.config();
const port = process.env.PORT || 4000;


const app = express();



app.use(cookieParser());
app.use(express.json());
// routes
app.use(cors());
app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', categoryRouter);
app.use('/api', adRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) =>
    console.error("Error during Data Source initialization:", err)
  );