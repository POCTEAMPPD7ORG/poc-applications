$(document).ready(function() {
    search_link();
});

function search_link() {
    $(document).on("click", "button[title='Search link']", function() {
        var query = $("input[aria-label=Search]").val().trim();
        if (query === "") {
                alert("Please input search text.");
                return;
            }
        if (query.length > 250) {
            alert("Search text should be less than 250 characters.");
            return;
        }
    $.ajax({
        url: "api/v1.0/link/search",
        data: { txt: query },
        dataType: "json",
        success: function(data) {
            console.log(data);
            update_table_with_data(data);
            },
        error: function(jqXHR, textStatus, error) {
            console.log(error);
            }
        });
    })
}

function update_table_with_data(data) {
    const table_body = document.getElementById("table_body_links");
    table_body.innerHTML = ""; // Clear existing table rows

    const results = data.results;

    results.forEach(result => {
    const fields = result.fields;
//    # const row = document.createElement("tr");

    var row = $(data).closet('tr')[0].id;
    Object.values(fields).forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    table_body.appendChild(row);
    });
}
