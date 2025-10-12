import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source.ts";
import { userRouter, authRouter, adRouter } from "./routes/index.ts";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());



// routes

app.use('/api', userRouter);
app.use('/api', authRouter);
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