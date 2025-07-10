import express from 'express'
import cors from 'cors'


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))
app.use(express.json());

// import routes
import healthcheckRouter from "./routes/healthcheck.routes.js"
import filterdata from "./routes/data.routes.js"


//routes
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/data",filterdata)

export {app}