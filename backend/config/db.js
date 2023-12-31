import mongoose from 'mongoose'

const connectDB = async () => {
    console.log(process.env.openUri)
    try {
        const conn = await mongoose.connect(process.env.openUri || "mongodb+srv://giang:123456789Aaa@cluster0.pffyt.mongodb.net/shop", { useNewUrlParser: true })
        console.log("MongoDB connected: " + conn.connection.host)
    } catch (err) {
        console.log("Error " + err.message);
        process.exit(1)
    }

}

export default connectDB
