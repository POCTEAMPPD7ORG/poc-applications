function clear_value() {
    document.getElementById("name").value = ""
    document.getElementById("environment").value = ""
    document.getElementById("link").value = ""
    document.getElementById("project").value = ""
    document.getElementById("description").value = ""
}

function add_link() {
    const link = {}
    link.name = document.getElementById("name").value
    link.environment = document.getElementById("environment").value
    link.link = document.getElementById("link").value
    link.project = document.getElementById("project").value
    link.description = document.getElementById("description").value
    link.created_at = convert_date_to_local_string(new Date().toString())

    const xmlhttp = new XMLHttpRequest()
    xmlhttp.open("POST", `api/v1.0/link`)
    xmlhttp.setRequestHeader("X-CSRFToken", getCookie('csrftoken'))
    xmlhttp.setRequestHeader('mode', 'same-origin')
    xmlhttp.send(JSON.stringify(link))
}
