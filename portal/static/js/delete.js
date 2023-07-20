function deleteLink(button) {
  var linkId = button.parentNode.getAttribute('link-id');
  if (confirm("Are you sure you want to delete this link?")) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("DELETE", `/api/v1.0/link/${linkId}`);
    xmlhttp.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    xmlhttp.setRequestHeader('mode', 'same-origin');

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === XMLHttpRequest.DONE) {
        if (xmlhttp.status === 200) {
          console.log('Link deleted successfully.');
          document.dispatchEvent(new CustomEvent('reload_table_links'));
        } else {
          console.error('Error deleting link:', xmlhttp.statusText);
        }
      }
    };

    xmlhttp.send(JSON.stringify(linkId))
  }
}

