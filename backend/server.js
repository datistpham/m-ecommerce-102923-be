import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import recommendRoutes from './routes/recommedRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import {Server } from "socket.io"
import http from "http"
dotenv.config()
const app = express()
const server = http.createServer(app);
const io = new Server(server);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
const port = process.env.PORT || 4000

connectDB()

app.use(express.static('public'))
app.use(bodyParser.json({ inflate: true }))

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use("/api/recommendation", recommendRoutes)
app.use("/api/category", categoryRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', function (req, res) {
    res.send('API is running')
  })
}

io.on("connection", socket=> {
  console.log("user connected")
  socket.on("new_order", data=> {
    console.log(123)
    io.emit("new_order_to_admin", {data})
  })
})

app.use(notFound)
app.use(errorHandler)

server.listen(port, () => {
  console.log(`MERN server is listening on port ${port}`)
})
