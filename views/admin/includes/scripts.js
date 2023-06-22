
const projectPath = location.origin;

async function check_login(element) {
    const username = $('#username')
    const password = $('#password')
    let username_status = false;
    let password_status = false;

    if (username.val() == '') {
        username.addClass("is-invalid");
    } else {
        username.removeClass("is-invalid").addClass("is-valid");
        username_status = true;
    }
    if (password.val() == '') {
        password.addClass("is-invalid");
    } else {
        password.removeClass("is-invalid").addClass("is-valid");
        password_status = true;
    }

    if (username_status && password_status) {
        element.addClass("disabled");
        await axios.post('/admin/CheckLogin', {
            username: username.val(),
            password: password.val()
        }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(function (response) {
            if(response.data.message == 'ok'){
                localStorage.clear();
                localStorage.setItem("token", response.data.token);
                location.replace('/Admin/Home')
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Login Fail',
                    text: 'Username or Password Incorrect!',
                })
                element.removeClass("disabled");
            }

        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
function logout(){
    localStorage.clear()
    location.replace('/Admin/AdminLogin')
}
async function authentication(){
    await axios.post('/admin/Auth', {}, {headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }})
    .then(function (response) {
        if(response.data.status != 'ok'){
            location.replace('/Admin/AdminLogin')
        }
    })
    .catch(function (error) {
        console.log(error.message);
    });
}
async function add_cert() {
    console.log('add_cert()');
    const cert_name = $('#cert-name')
    const cert_detail = $('#cert-detail')
    const cert_template = $('#cert-template');

    if (cert_name.val() == '' || cert_detail.val() == '' || cert_template.prop('files')[0] == undefined) {
        if (cert_name.val() == '') {
            cert_name.addClass("is-invalid");
        } else {
            cert_name.removeClass("is-invalid").addClass("is-valid");
        }
        if (cert_template.prop('files')[0] == undefined) {
            cert_template.addClass("is-invalid");
        } else {
            cert_template.removeClass("is-invalid").addClass("is-valid");
        }
        if (cert_detail.val() == '') {
            cert_detail.addClass("is-invalid");
        } else {
            cert_detail.removeClass("is-invalid").addClass("is-valid");
        }

    } else {
        alert('insert...')
        var formData = new FormData();
        formData.append("cert_name", cert_name.val());
        formData.append("cert_detail", cert_detail.val());
        formData.append("cert_template", cert_template.prop('files')[0]);

    //     console.log(formData);
    //     await axios.post('/admin/AddCert',formData, {
    //         headers: {
    //         'Content-Type': 'multipart/form-data',
    //         'Authorization': 'Bearer ' + localStorage.getItem("token")
    //         }
    // })
        let response = await axios({
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            url: '/admin/AddCert',
            data: formData
        });
        console.log(response.data);
        if(response.statusText == 'OK'){
            //alert('ok')
            window.location = `/admin/ChooseClassPage/${response.data.data}`
        }
    }
}

function previewImg(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#course_img_preview').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$(document).ready( async function () {

    //authentication()
    $('#btn_login').click(function () {
        check_login($('#btn_login'))
    });

    $('#btn_add-cert-1').click(function () {
        add_cert($('#btn_add-cert-1'))
    });
})