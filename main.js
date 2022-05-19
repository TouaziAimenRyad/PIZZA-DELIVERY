const express=require('express')
const pool=require('./db_pool/pool')
const routes=require('./routes/routes')
const Cart=require('./models/cart')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const server=express()

server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));
server.set('view engine','ejs')

server.use('/menu',routes)

server.get('/',(req,res)=>{
    res.redirect('/menu')
})


//-----------------------------------------------------------------

let users=[]

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }



const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)



server.use(flash())
server.use(session({
  secret: "SECRET",
  resave: false,
  saveUninitialized: false
}))
server.use(passport.initialize())
server.use(passport.session())
server.use(methodOverride('_method'))

server.get('/livreur', checkAuthenticated, (req, res) => {
    res.render('livreur', { name: req.user.name })
  })



server.get('/login', checkNotAuthenticated,async(req,res)=>{
    users = (await pool.query("select * from users")).rows
    res.render('livreur_login')
})


server.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/livreur',
    failureRedirect: '/login',
    failureFlash: true
  }))

server.get('/register',checkNotAuthenticated, (req,res)=>{
    res.render('livreur_register')
})


server.post('/register', checkNotAuthenticated, async(req,res)=>{

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await pool.query("INSERT INTO users(nom,prenom,email,password) VALUES('"+req.body.name+"','"+req.body.name+"','"+req.body.email+"','"+hashedPassword+"') ")
        res.redirect('/login')
      } catch {
        res.redirect('/register')
      }
    
})

server.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  

server.use((req, res) => {
    res.status(404).send('404')
})

server.listen(8000)