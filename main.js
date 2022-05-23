const express=require('express')
const pool=require('./db_pool/pool')
const fs=require('fs')
const path=require('path')
const routes=require('./routes/routes')
const Cart=require('./models/cart')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const server=express()



//menu section
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.urlencoded({ extended: true }));
server.set('view engine','ejs')

server.use('/menu',routes)

server.get('/',(req,res)=>{
    res.redirect('/menu')
})


//-----------------------------------------------------------------


//livreur section
let users=[]

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/livreur')
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

server.get('/livreur', checkAuthenticated, async(req, res) => {
    let commandes
    fs.readFile('./public/data/command.json', (err, data) => {
      if (err) {
        console.log(err)
        res.send("data base error")
      }
      else
      {
        commandes= JSON.parse(data)
        res.render('livreur', { name: req.user.nom,commandes:commandes.commandes })
      }
      
    })
    
})

server.post('/livreur/select_cmd',checkAuthenticated,(req,res)=>
{
  let commandes
  let data =fs.readFileSync('./public/data/command.json')
  
  commandes= JSON.parse(data)
  let index=commandes.commandes.findIndex((x=>x.id==req.body.id_cmd))
  if (index<0)
  {
    console.log("not found")
  }
  else
  {
    commandes.commandes[index].valid=false//remove and put in another array
  }
  fs.writeFileSync('./public/data/command.json',JSON.stringify(commandes))
  res.redirect('/livreur/cmd_detail/'+commandes.commandes[index].id)
    
})
 
server.get('/livreur/cmd_detail/:id',checkAuthenticated,(req,res)=>
{
  let data =fs.readFileSync('./public/data/command.json') 
  commandes= JSON.parse(data)
  let index=commandes.commandes.findIndex((x=>x.id==req.params.id))
  if (index<0)
  {
    console.log("not found")
    res.end()
  }
  else
  {
    res.render('command_detail',{commande:commandes.commandes[index]})
  }

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
        
        await pool.query("INSERT INTO users(nom,prenom,email,password) VALUES('"+req.body.name+"','"+req.body.firstName+"','"+req.body.email+"','"+hashedPassword+"') ")
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
    res.status(404).render('404')
})

server.listen(8000)