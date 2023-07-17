console.log("Portal scripts")

function clear_value_dialog_edit() {
    document.getElementById("name").value = ""
    document.getElementById("environment").value = ""
    document.getElementById("link").value = ""
    document.getElementById("project").value = ""
    document.getElementById("description").value = ""
}

function onEditLink(node) {
    var portal_id = node.parentNode.attributes['link-id'].value
    console.log(portal_id)
    var link_data = JSON.parse(sessionStorage.getItem(portal_id))
    document.getElementById("edit-id").value = portal_id
    document.getElementById("edit-name").value = link_data.name
    document.getElementById("edit-env").value = link_data.environment
    document.getElementById("edit-link").value = link_data.link
//    disable link edit because it is primary key
    document.getElementById("edit-link").setAttribute("disabled","")
    document.getElementById("edit-link-type").value = link_data.project
    document.getElementById("edit-description").value = link_data.description
    document.getElementById("edit-createdBy").value = link_data.created_by

}

function request_edit_link(){
    console.log("Request Edit Link")

    const link = {}
    link.id = document.getElementById("edit-id").value
    link.name = document.getElementById("edit-name").value
    link.environment = document.getElementById("edit-env").value
    link.link = document.getElementById("edit-link").value
    link.project = document.getElementById("edit-link-type").value
    link.description = document.getElementById("edit-description").value

    const xmlhttp = new XMLHttpRequest()
    xmlhttp.onload = function() {
        // todo:hide update dialog
        console.log('Hide edit dialog...');
        $('#modal-edit').modal('hide');
        document.dispatchEvent(new CustomEvent('reload_table_links'));
    }
    xmlhttp.open("PUT", `api/v1.0/link`)
    xmlhttp.setRequestHeader("X-CSRFToken", getCookie('csrftoken'))
    xmlhttp.setRequestHeader('mode', 'same-origin')
    xmlhttp.send(JSON.stringify(link))
}
