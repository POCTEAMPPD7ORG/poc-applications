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
