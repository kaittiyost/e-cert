const projectPath = location.origin;

function SearchCert(){
    console.log('search');
    const std_code = $('#std_code');
    if (std_code.val() == '') {
        std_code.addClass("is-invalid");
    } else {
        std_code.removeClass("is-invalid").addClass("is-valid");
    }
}


$(document).ready( async function () {

    $('#btn_search').click(function () {
        SearchCert()
    });

})