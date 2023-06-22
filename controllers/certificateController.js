const dbConfig = require('../db_config');
var formidable = require("formidable");
var fs = require("fs");
const path = require('path');

var CryptoJS = require("crypto-js");

var jwt = require('jsonwebtoken');

let line = "###########################################################################";


const AllCert = (req, res) => {
    console.log(line);
    console.log('all certificate request.');

    let msg="";
    const admin_username = 660527499;
    let sql = `SELECT * ,DATE_FORMAT(time_reg,'%d%M%Y') date FROM certificates WHERE certificates.admin_user = ?`;
    dbConfig.connectionMySQL.query(sql,[admin_username],
        (error, result, fields) => {

            if (error) throw error;
            if (result === undefined || result.length == 0) {
                msg = "empty";
            } else {
                msg = "ok";
                console.log('ok');
            }
            res.render("admin/home",{
                error: false,
                data: result,
                message: msg
            });
        }
    );
}

const AddCertPage = (req, res) => {
    console.log(line);
    console.log('add certificate page request.');
    res.render("admin/add_cert");
}

const ChooseClassPage = (req, res) => {
    console.log(line);
    console.log('choose class page request.'+req.params.cert_code);

    const ccode = req.params.cert_code;
    const admin_username = 660527499;
    let sql = `SELECT * ,DATE_FORMAT(time_reg,'%d%M%Y') date FROM certificates WHERE certificates.code=? AND certificates.admin_user = ?`;
    dbConfig.connectionMySQL.query(sql,[ccode, admin_username],
        (error, result, fields) => {

            if (error) throw error;
            if (result === undefined || result.length == 0) {
                msg = "empty";
            } else {
                msg = "ok";
                console.log('ok');
            }
            res.render("admin/choose_class",{
                data : result
            });
        }
    );

}

const AddCert = (req, res) => {
    console.log(line);
    console.log('add certificate request.');

    let msg;
    const token = req.headers.authorization.split(' ')[1]
    var decoded = jwt.verify(token, 'wowza')

    const admin_username = decoded.username;

    const form = new formidable.IncomingForm();
    //console.log(decoded);

    const cert_code = String(Date.now());

    form.parse(req, function (err, fields, files) {

        const cert_name = fields.cert_name;
        const cert_detail = fields.cert_detail;

        let cert_template, image_status;

        try { cert_template = files.cert_template.originalFilename; } catch (error) { }

        if (cert_template) {
            const FileType = path.extname(files.cert_template.originalFilename);
            if (FileType != '.png') {
                console.log('please upload png file.');
                msg = 'please upload png file.';
                image_status = false;
            } else {
                let oldpath = files.cert_template.filepath;
                let newpath = __dirname + "/../assets/images/cert_template/" + String(cert_code + FileType);
                console.log(newpath);
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                    console.log("File uploaded!");
                });
                image_status = true;
            }
            if (image_status) {
                let sql = `INSERT INTO certificates(name,code,template,detail,admin_user,status,time_reg) VALUES(?,?,?,?,?,0,current_timestamp())`;
                dbConfig.connectionMySQL.query(sql,
                    [cert_name, cert_code, String(cert_code + FileType), cert_detail, admin_username],
                    (error, result, fields) => {

                        if (error) throw error;
                        if (result === undefined || result.length == 0) {
                            msg = "empty";
                        } else {
                            msg = "ok";
                            console.log('ok');
                        }

                    }
                );
            }
        } else {
            msg = 'user not upload image';
            console.log('user not upload image');
        }
    })
    return res.send({ 
        data: cert_code,
        message: msg });
}

module.exports = {
    AllCert,
    AddCertPage,
    ChooseClassPage,
    AddCert
}