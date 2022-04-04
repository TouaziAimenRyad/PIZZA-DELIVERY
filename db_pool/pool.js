const Pool=require('pg').Pool

const pool=new Pool({
    user:'projet_user',
    password:'00000000',
    host:'localhost',
    port:5432,
    database:'projet_web'

})

module.exports=pool