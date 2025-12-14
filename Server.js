

import dotenv from "dotenv";
import express from "express";
import mongoose  from "mongoose";
import userRouter from './route/user.js'
import product from './route/product.js'

const app = express()
app.use (express.json());
    dotenv.config()

app.listen(process.env.PORT,()=> {
    console.log(`backend is running in port ${process.env.PORT}`);

})

// routes
app.use('/api/user', userRouter)
app.use('/api/product', product)

app.get('/', (req, res)=>{
    res.send('Hello Queen')

})

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("connected to my Database omalucy")
}).catch(()=>{
    console.log('failed to connect')
})