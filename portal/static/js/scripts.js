console.log(`ATTENTION from Vinh: with each row of link, I put an attribute 'link-id' on cell contains actions`)

function body_onload() {
    reload_table_links()
}

function convert_date_to_local_string(date_string) {
    date = new Date(date_string)
    // console.log(`date=${date}`)
    output = date.toLocaleString('en-US', {timeZoneName:'shortOffset'})
    // console.log(`output=${output}`)
    return output
}

function example_get_link_detail_from_session_storage(link_id) {
    // getLink is String format, use JSON.parse to convert it to useful data
    get_link = sessionStorage.getItem(link_id);
    console.log(`get_link=${get_link}`)
    link_data = JSON.parse(get_link)
    console.log(`link_data=${link_data}`)
}

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
