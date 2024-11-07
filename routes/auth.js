var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var { connection, SECRET } = require('../config/config')

router.post('/login',(req, res) => {
    let { username, password } = req.body

    connection.connect()

    let sql = "SELECT * FROM user WHERE username='" + username + "'";

    connection.query(sql, async (err, rows, fields) => {
        if (err) throw err

        if(rows.length > 0){
            let validated = await bcrypt.compare(password, rows[0].password)
            if(validated){
                return res.status(200).json({
                    token: jwt.sign({
                        exp: 12321312312312312312,
                        id: rows[0].id,
                        name: username
                    }, SECRET)
                })
            }else{
                return res.status(400).json({
                    message: "Your username or password is incorrect"
                })
            }
        }else{
            return res.status(404).json({
                message: "Your username does not exist. Are you registered?"
            })
        }
    })
    connection.end()
})

router.post('/register',async (req,res)=>{
    let {username, password} = req.body
    
    let encryptedPassword = await bcrypt.hash(password, 10)

    let sql = "INSERT INTO user(username, password) VALUES (?,?)"

    connection.connect()

    try{
        connection.query(sql, [username, encryptedPassword] ,(err, rows, fields)=>{
            if(err) throw err
    
            return res.status(200).json({
                message: "Successfully registered"
            })
        })
    }catch(err){
        return res.status(500).json({
            message: "Not working"
        })
    }
   
    connection.end()

    

    

})

module.exports = router;