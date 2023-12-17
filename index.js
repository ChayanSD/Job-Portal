import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import testRoute from "./routes/testRoute.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddlewares from "./middlewares/errorMiddlewares.js";
import "express-async-errors";
dotenv.config({
    path :'./config/.env'
});

const app = express();

connectDB()
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log(`Server listen at ${process.env.PORT}`.bgCyan.white);
        });
        app.on('error',(error)=>{
            console.log(`ERROR ${error}`.bgRed.white);
            throw error;
        })
    }).catch((err)=>{
    console.log(`MONGO ERROR ${err}`.bgRed.white);
})

app.use(express.json());
app.use(cors());
app.use(morgan('dev'))
app.use(errorMiddlewares);

app.use('/api/v1/test',testRoute);
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/auth',authRoutes)
