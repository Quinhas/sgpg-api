import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { classRouter } from "./routes/class.router";
import { employeeRouter } from "./routes/employee.router";
import { instrumentRouter } from "./routes/instrument.router";
import { instrumentBrandRouter } from "./routes/instrumentbrand.router";
import { roleRouter } from "./routes/role.router";
import { eventRouter } from "./routes/event.router";
import { instrumentTypeRouter } from "./routes/instrumenttype.router";
import { responsibleRouter } from "./routes/responsible.router";
import { studentRouter } from "./routes/student.router";

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

// Routes

app.use("/employees", employeeRouter);
app.use("/roles", roleRouter);
app.use("/instrumentbrands", instrumentBrandRouter);
app.use("/instruments", instrumentRouter);
app.use("/classes", classRouter);
app.use("/events", eventRouter);
app.use("/instrumenttypes", instrumentTypeRouter);
app.use("/responsibles", responsibleRouter);
app.use("/students", studentRouter);
app.use(errorHandler);
app.use(notFoundHandler);
