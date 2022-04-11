const express=require('express')
const routes=require('./routes/routes')
const server=express()

server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));
server.set('view engine','ejs')

server.use('/menu',routes)

server.use((req, res) => {
    res.status(404).send('404')
})

server.listen(8000)