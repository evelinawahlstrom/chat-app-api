const {Router} = require ('express')
const Chatroom = require ('./model')
const Sse = require ('json-sse')

const router = new Router()
const stream = new Sse()


router.get('/stream', async (req, res) => {
    console.log("I got a request on /stream")
    //res.status(200)
    //res.send("The stream endpoint works!")
    const messages = await Chatroom.findAll()
    //console.log("messages in db:", messages)
    // this above gives a lot of output in the console, 
    // below we strungify
    const data = JSON.stringify(messages)
    console.log("stringified messages: ", data)

    stream.updateInit(data) // here I put the data in the stream
    stream.init(req, res)   // this is important!!!, get rid of res.stat and res.send, for this to work --> stream will handle the connection instead
})

// async await function --> could have .then instead after
// Chatroom.create
router.post('/message', async (req, res) => {
    console.log("I got a request on /message", req.body)
    const {message} = req.body
    // above destructuring, req.body.message to req.body
    // below, await that my chatroom is created
    const entity = await Chatroom.create({
    message
    })
    //res.status(201)
    //res.send("Thank you for your message")
    const messages = await Chatroom.findAll()
    const data = JSON.stringify(messages)
    console.log("stringified messages: ", data)
    stream.send(data) /// Uppdate the stream
})

module.exports = router