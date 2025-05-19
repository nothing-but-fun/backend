import router from "./routes";

import express, { json } from "express";
import { rateLimit } from 'express-rate-limit'
import cors from 'cors'

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(json())
app.use(cors())


// 服务器配置
const port = process.env.PORT || 3000;

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
