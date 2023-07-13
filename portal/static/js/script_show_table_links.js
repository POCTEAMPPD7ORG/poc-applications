var total_links = 0
var link_per_page = 5
var current_page = 0
var page_count = 1

function set_link_per_page(set_value) {
    link_per_page = set_value;
    document.querySelector("#button_select_link_per_page").innerHTML = set_value;
    select_pagination(0)
}

function select_prev_pagination() {
    select_pagination(current_page - 1)
}

function select_next_pagination() {
    select_pagination(current_page + 1)
}

function select_pagination(page_to_select) {
    console.log(`Select page ${page_to_select + 1}`)
    if (page_to_select < 0) {
        page_to_select = 0
    } else if (page_to_select >= page_count) {
        page_to_select = page_count - 1
    }
    current_page = page_to_select
    reload_table_links()
}

// Reload table links
// Update pagination
function reload_table_links() {
    function clear_table() {
        document.querySelector("#table_body_links").innerHTML = "";
    }
    function update_pagination() {
        if (total_links===0) {
            start = 0
        } else {
            page_count = parseInt(total_links / count)
            if (total_links > page_count * count) {
                page_count += 1
            }
            console.log(`total_links=${total_links} & link_per_page=${link_per_page} -> page_count=${page_count}`)
        }
        const ul = document.querySelector("#list_table_links_pagination");
        // Clear pagination
        ul.innerHTML = "";
        const template_prev = document.querySelector("#template_list_item_previous");
        const clone_prev = template_prev.content.cloneNode(true);
        if (current_page!=0) {
            let li = clone_prev.querySelector('li');
            li.setAttribute('class', 'page-item')
        }
        ul.appendChild(clone_prev);

        for (page = 0; page < page_count; page++) {
            const template = document.querySelector("#template_list_item_pagination");
            const clone = template.content.cloneNode(true);
            let a = clone.querySelector('a');
            a.innerHTML = page + 1
            a.setAttribute('onclick', `select_pagination(${page})`)
            if (current_page!=page) {
                let li = clone.querySelector('li');
                li.setAttribute('class', 'page-item')
            }
            ul.appendChild(clone);
        }

        const template_next = document.querySelector("#template_list_item_next");
        const clone_next = template_next.content.cloneNode(true);
        if (current_page!=(page_count - 1)) {
            let li = clone_next.querySelector('li');
            li.setAttribute('class', 'page-item')
        }
        ul.appendChild(clone_next);
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
        update_pagination()
        for (let i = 0; i < response.count; i++) {
            const link = {}
            Object.entries(response.links[i]).forEach(([key, value]) => {
                // console.log(`Key=${key} Value=${value}`)
                link[key] = value;
            })
            console.log(`link=${link}`)
            add_new_row(i + 1 + current_page * link_per_page,
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
    start = current_page * link_per_page
    count = link_per_page
    var url = `/api/v1.0/link?start=${start}&count=${count}`;
    url += '&search=' + $("input[aria-label=Search]").val().trim();
    xmlhttp.open("GET", url);

    //--- Get CSRF token, and embedded it to request. Django Back-end CSRF verification is enabled.
    xmlhttp.setRequestHeader("X-CSRFToken", getCookie('csrftoken'))
    xmlhttp.setRequestHeader('mode', 'same-origin')
    xmlhttp.send()
}
