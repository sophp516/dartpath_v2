import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import courseRoutes from "./routes/course.routes";
import profRoutes from "./routes/prof.routes"
import userRoutes from "./routes/user.routes"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8003

app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/prof", profRoutes);
app.use("/api/profile", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})