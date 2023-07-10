$(document).ready(function() {
    search_link();
});

function search_link() {
    $(document).on("click", "button[title='Search link']", function() {
        var query = $("input[aria-label=Search]").val().trim();
        if (query.length > 250) {
            alert("Search text should be less than 250 characters.");
            return;
        }

        reload_table_links();

    });

}

