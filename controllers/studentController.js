const dbConfig = require('../db_config');
let line = "###########################################################################";


const StdCert = (req, res) => {
    console.log(line);
    console.log('get certificate request.');
    res.render("student/index");
}

const SearchCert = (req,res) => {
    const cert_name = req.body.cert_name;
    const cert_detail = req.body.cert_detail;
    

    var sqlCommand = "SELECT *, DATE(time_reg) date FROM std_cert WHERE std_cert.student = ?";
    var sqlValue = [];
    sqlValue.push(cert_name);
    sqlValue.push(cert_detail);
  
    var sql = mysql.format(sqlCommand, sqlValue);
    let msg;
    dbConfig.connectionMySQL.query(sql, function (error, results, fields) {
      if (error) {
        console.log(error);
        msg = 'fail'
      } else {
          msg = 'ok'
          return res.send(results);
      }
    });
}

module.exports = {
    StdCert,
    SearchCert
}