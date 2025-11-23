import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/data-source.ts";
import { userRouter, authRouter, adRouter, categoryRouter } from "./routes/index.ts";
import cors from "cors";
import cookieParser from "cookie-parser";
import { locationRouter } from "./routes/location.routes.ts";
import path from "path";
import { fileURLToPath } from "url";
import { uploadFileRouter } from "./routes/uploadFile.routes.ts";


dotenv.config();
const port = process.env.PORT || 4000;


const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(cookieParser());
app.use(express.json());


// routes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use("/image", express.static(path.join(__dirname, "image")));
app.use("/image", express.static(path.join(__dirname, "../image")));

app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', categoryRouter);
app.use('/api', adRouter);
app.use('/api', locationRouter);
app.use('/api', uploadFileRouter);

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