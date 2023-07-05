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
