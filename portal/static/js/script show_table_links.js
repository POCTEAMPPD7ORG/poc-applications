
function reload_table_links() {
    function clear_table() {
        document.querySelector("#table_body_links").innerHTML = "";
    }
    function add_new_row(index, link_id, name, env, link, proj, desc, add_by, add_at, upd_by, upd_at) {
        if ("content" in document.createElement("template")) {
            // Instantiate the table with the existing HTML tbody
            // and the row with the template
            const tbody = document.querySelector("#table_body_links");
            const template = document.querySelector("#template_row_link");
          
            // Clone the new row and insert it into the table
            const clone = template.content.cloneNode(true);
            // index
            let th = clone.querySelector("th");
            th.innerHTML = index
            // Query cell
            let td = clone.querySelectorAll("td");
            // Name
            td[0].innerHTML = name;
            // Env
            td[1].innerHTML = env;
            // Link
            td[2].querySelector("a").href = link
            td[2].querySelector("a").innerHTML = link.length < 48 ? link : link.substring(0, 48) + '...'
            // Project
            td[3].innerHTML = proj;
            // Description
            td[4].innerHTML = desc;
            // Created by
            td[5].innerHTML = add_by;
            // Created at
            td[6].innerHTML = convert_date_to_local_string(add_at);
            // Updated by
            td[7].innerHTML = upd_by;
            // Updated at
            td[8].innerHTML = convert_date_to_local_string(upd_at);
            // actions
            td[9].setAttribute('link-id', link_id)
            tbody.appendChild(clone);
        } else {
            // Find another way to add the rows to the table because
            // the HTML template element is not supported.
        }
    }
    const xmlhttp = new XMLHttpRequest()
    //--- Set callback function to handle on-load (received) data
    xmlhttp.onload = function() {
        // console.log(`response=${this.responseText}`)
        const response = JSON.parse(this.responseText)
        console.log(`Count=${response.count} Total=${response.total}`)
        total_links = response.total
        clear_table()
        for (let i = 0; i < response.count; i++) {
            const link = {}
            Object.entries(response.links[i]).forEach(([key, value]) => {
                // console.log(`Key=${key} Value=${value}`)
                link[key] = value;
            })
            console.log(`link=${link}`)
            add_new_row(i + 1, 
                        link.id, 
                        link.name, 
                        link.environment, 
                        link.link, 
                        link.project, 
                        link.description,
                        link.created_by,
                        link.created_at,
                        link.updated_by,
                        link.updated_at)
            //--- Store link detail for other purpose
            sessionStorage.setItem(link.id, JSON.stringify(link));
            // table_portals_update_row(portal.id)
        }
        // Just for demo, would be delete later
        example_get_link_detail_from_session_storage(1)
    }
    //--- Example of request single link
    // xmlhttp.open("GET", `/api/v1.0/link/2`) 
    xmlhttp.open("GET", `/api/v1.0/link?start=0&count=100`)
    //--- Get CSRF token, and embedded it to request. Django Back-end CSRF verification is enabled.
//    xmlhttp.setRequestHeader("X-CSRFToken", getCookie('csrftoken'))
//    xmlhttp.setRequestHeader('mode', 'same-origin')
    xmlhttp.send()
}