const express = require('express')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
const connectDB = require('./helpers/connectDB');
const userRouter = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: '*',
}))
app.use(cookieParser())
dotenv.config()

app.use('/api/v1/u',userRouter);

const start = async()=>{
    await connectDB()
    app.listen(process.env.PORT,()=>console.log(`App Started at ${process.env.PORT}`))

}
start()