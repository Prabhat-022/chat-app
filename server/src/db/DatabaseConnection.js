import mongoose from 'mongoose';

const DatabaseConnection = () => {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("Mongodb connected")
    }).catch((error) => {
        console.log(`Mongodb not connected: ${error}`)
    })
}

export default DatabaseConnection;