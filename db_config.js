
// mySQL
const mysql = require ( "mysql2" );
var connectionMySQL = mysql.createConnection (
    {
        host : "172.20.10.11"
        , user : "alansuperwowza"
        , password : "P@ssw0rd"
        , database : "e-cert"
    }
);
connectionMySQL.connect ( function ( error ) { 
        if ( error ) {
            console.log ( error );
            console.log('MySQL Error!');
        }else {
            console.log ( "MySQL Connected!" );
        }
    } 
);

module.exports = {
    connectionMySQL
}