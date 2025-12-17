import express from 'express';
import cors from 'cors';
import { dbConnection } from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js'
import helpRoutes from './src/routes/helpRoutes.js'
import profileRoutes from './src/routes/profileRoutes.js'
import materialRoutes from './src/routes/materialRoutes.js'
import chatRoute from './src/AI_CHAT/routes/chat.router.js'

// -------------------------
import mlRoutes from "./src/routes/ml.routes.js";

// --------------------------

const app = express();
const PORT = 8080;

app.use(cors())
app.use(express.json())

app.get("/test", async(req, res)=>{
    res.json({
        message: "New Update: Test route was successfull!"
    })
})

app.use("/api", authRoutes)
app.use("/api", helpRoutes)
app.use("/api", profileRoutes)
app.use("/api", materialRoutes)
app.use("/api", chatRoute);

app.use("/api/ml", mlRoutes);


app.listen(PORT,"0.0.0.0", ()=>{
    console.log(`Server is listening on ${PORT}`)
    dbConnection();
})