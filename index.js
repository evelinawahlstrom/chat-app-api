const express = require ('express')
const bodyParser = require ('body-parser')
const streamRouter = require ('./stream/router')
const userRouter = require ('./user/router')
const cors = require ('cors')

const app = express() 
// process.env, makes it possible to reach the port 
const port = process.env.Port || 5000

const jsonParser = bodyParser.json()

app
.use(cors())
.use(jsonParser)
.use(streamRouter)
.use(userRouter)



app.listen(port, () => console.log ("Server running on port ", port))

app.get('/', (req, res) => {
    console.log("We get a req on /")
    res.status(200)
    res.send("hey you rockstar")
})