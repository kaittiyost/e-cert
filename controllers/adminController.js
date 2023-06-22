const dbConfig = require('../db_config');
var jwt = require('jsonwebtoken');
const secret = 'wowza'
let line = "###########################################################################";


const AdminLogin = (req, res) => {
    console.log(line);
    console.log('admin login request.');
    res.render("admin/login");
}
const Auth = (req, res) => {
    console.log(line);
    console.log('admin authentication request.');
    try {
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token,secret)
        res.json({status:'ok',decoded})
    } catch (error) {
        console.log(error);
        res.json({status:'err',message:error.message})
    }
}
const CheckLogin = (req,res) => {
    console.log(line);
    console.log('admin check login request.');
 
    try {
        // var username = sanitizer.escape(req.body.email);
        // var password = sanitizer.escape(req.body.password);
        const username = req.body.username;
        const password = req.body.password;
        let token;
        
        var sql = 'SELECT * FROM tb_admin WHERE username = ? AND password = ?'
        dbConfig.connectionMySQL.query(
            sql,[username,password], (error, result, fields) => {
                if (error) throw error;
                let message = "";
 
                if (result === undefined || result.length == 0) {
                    message = "fail";
                } else {
                    token = jwt.sign({username: username}, secret, {expiresIn:'1h'});
                    message = "ok";
                }
                return res.send({
                    data: result,
                    message: message,
                    token: token
                });
            });
        } catch (error) {
            console.log(error);
        }
}

module.exports = {
    AdminLogin,
    Auth,
    CheckLogin 
}