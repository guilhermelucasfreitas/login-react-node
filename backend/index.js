const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

mongoose.connect('mongodb+srv://visitor:yUW1RNLAu16meEgM@cluster0.tq2zz.mongodb.net/todo-project', {
     useNewUrlParser: true,
     useUnifiedTopology: true
}).then(() => {
    console.log("Successful conection with MongoDB");
}).catch((error) => {
    console.log("Error: Unsuccessful connection with MongoDB");
});

const routes = require('./routes/routes')

app = express()

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200', 'https://production-login-frontend.herokuapp.com']
}))

app.use(express.json())

app.use('/api', routes)

app.listen(process.env.PORT || 3000)
