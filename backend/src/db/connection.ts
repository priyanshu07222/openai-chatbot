import mongoose from 'mongoose'

async function connectToDatabase(){
try {
        await mongoose.connect(process.env.MONGODB_URL)
    
} catch (error) {
    console.log(error)
    throw new Error("Cannot connect to mongoDb")
}}

async function disconnectFromDatabase(){
    try {
        await mongoose.disconnect()
    } catch (error) {
        console.log(error)
        throw new Error("Database disconneted")
    }
}

export { connectToDatabase, disconnectFromDatabase}