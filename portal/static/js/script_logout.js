
function logout_portal() {
    if (window.confirm("Do you really want to leave?") == false) {
        return
    }
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.onload = function() {
        console.log(`response=${this.responseText}`)
        if (JSON.parse(this.responseText)['result'] == 'OK') {
            window.location.replace("/login");
        }
    }
    xmlhttp.open("POST", `/api/v1.0/logout`)
//    xmlhttp.setRequestHeader("X-CSRFToken", getCookie('csrftoken'))
//    xmlhttp.setRequestHeader('mode', 'same-origin')
    xmlhttp.send()
}