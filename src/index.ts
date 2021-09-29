import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT = Number(process.env.PORT);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`[server] API listening at http://localhost:${PORT}`);
});
