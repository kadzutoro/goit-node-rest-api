import express from "express";
import morgan from "morgan";
import cors from "cors";
import 'dotenv/config'
import mongoose from "mongoose";
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from './routes/authRouter.js'
import usersRouter from "./routes/userRouter.js"
import checkToken from "./middlewares/checkToken.js";
import path from 'node:path'


const DB_URI = process.env.DB_URI;
const app = express();

mongoose
.connect(DB_URI)
.then(() => console.log('Database connection successful'))
.catch((err) => {
  console.error(err);
  process.exit(1);
});


app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts",checkToken, contactsRouter );
app.use("/api/users", authRouter)
app.use("/avatars", express.static(path.resolve("public/avatars")));
app.use("/users", checkToken, usersRouter)
app.use(express.static(path.resolve("public")));

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});