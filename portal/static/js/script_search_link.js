$(document).ready(function() {
    search_link();
});

function search_link() {
    $(document).on("click", "#search-btn", function() {
        var query = $("#search-value").val().trim();
        if (query.length > 250) {
            alert("Search text should be less than 250 characters.");
            return;
        }
        reload_table_links();
    });
    $("#search-value").on("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
         $("#search-btn").click();
        }
      });
}
