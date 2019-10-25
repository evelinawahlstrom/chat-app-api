const {Router} = require ('express')
const User = require ('./model')
const bcrypt = require("bcrypt");
const { toJWT } = require ('./jwt')

router = new Router()

router.post("/user", (req, res, next) => {
    console.log("A req on /user")
    const email = req.body.email
    const password = req.body.password
    if (!email || !password) {
        res.status(400).send({
            message: "Please supply a valid email and password"
        })   
    }else{
        User.create({
            email: email,
            password: bcrypt.hashSync(req.body.password, 10)
        })
        .then(user => {
            res.status(201)
            res.send({status:"OK"})
        } )
    }
})

router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
  
    if (!email || !password) {
      res.status(400).send({
        message: 'Please supply a valid email and password'
      })
    }
    else {
      // 1. find user based on email address
      // 2. use bcrypt.compareSync to check the password against the stored hash
      // 3. if the password is correct, return a JWT with the userId of the user (user.id)
  
      //res.send({
       // jwt: toJWT({ userId: 1 })
     // })
     User
  .findOne({
    where: {
      email: req.body.email
    }
  })
  .then(entity => {
    if (!entity) {
      res.status(400).send({
        message: 'User with that email does not exist'
      })
    }

    // 2. use bcrypt.compareSync to check the password against the stored hash
    else if (bcrypt.compareSync(req.body.password, entity.password)) {

      // 3. if the password is correct, return a JWT with the userId of the user (user.id)
      res.send({
        jwt: toJWT({ userId: entity.id })
      })
    }
    else {
      res.status(400).send({
        message: 'Password was incorrect'
      })
    }
  })
  .catch(err => {
    console.error(err)
    res.status(500).send({
      message: 'Something went wrong'
    })
  })
    }
  })

module.exports = router