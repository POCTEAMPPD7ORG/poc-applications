const input = document.getElementById("input-login-password");
input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        login_portal(document.getElementById('input-login-username').value,document.getElementById('input-login-password').value)
    }
})

function login_portal(username, password) {
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.onload = function() {
        console.log(`response=${this.responseText}`)
        if (JSON.parse(this.responseText)['result'] == 'OK') {
            document.getElementById('login-failed-notify').setAttribute('hidden', 'true')
            window.location.replace("/");
        } else {
            document.getElementById('login-failed-notify').removeAttribute('hidden')
        }
    }
    xmlhttp.open("POST", `/api/v1.0/login`)
//    xmlhttp.setRequestHeader("X-CSRFToken", getCookie('csrftoken'))
//    xmlhttp.setRequestHeader('mode', 'same-origin')
    xmlhttp.send(JSON.stringify({'username':username,'password':password}))
}


