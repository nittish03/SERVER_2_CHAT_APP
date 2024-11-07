import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import connectDb from "./db/connectDb.js";
import {app,server} from './socket/socket.js';

dotenv.config();

// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);


server.listen(PORT, () => {
	connectDb();
	console.log(`Server Running on port ${PORT}`.bgCyan.white);
  console.log();
});