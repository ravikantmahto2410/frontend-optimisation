import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        console.log(`/n MongoDB Connected! DB host: ${connectionInstance.connection.host}`)
        console.log(`/n MongoDB connected! DB port: ${connectionInstance.connection.port}`)
        console.log(`/n MongoDB connected ! DB Name : ${connectionInstance.connection.name}`)
        console.log(`/n MongoDB connected ! DB readyState: ${connectionInstance.connection.readyState}`)
        console.log(`/n MongoDB connected! DB connection String ${connectionInstance.connection.client.s.url}`)


    } catch (error) {
        console.log("MongoDB Connection Error", error)
        process.exit(1)
    }
}

export default connectDB