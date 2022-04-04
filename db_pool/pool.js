const Pool=require('pg').Pool

const pool=Pool({
    user:'projet_user',
    password:'00000000',
    host:'localhost',
    port:5500,
    database:'db name'

})

module.exports=pool