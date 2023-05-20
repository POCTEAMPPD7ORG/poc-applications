var name_link = null;
var env = null;
var link = null;
var type = null;
var description = null;
var createdBy = null;
var editRow = null

function getDataFromAddInput() {
  name_link = document.getElementById("name").value;
  env = document.getElementById("env").value;
  link = document.getElementById("link").value;
  type = document.getElementById("type").value;
  description = document.getElementById("description").value;
  createdBy = document.getElementById("createdBy").value;
}

function getDataFromEditInput() {
    name_link = document.getElementById("nameEdit").value;
    env = document.getElementById("envEdit").value;
    link = document.getElementById("linkEdit").value;
    type = document.getElementById("typeEdit").value;
    description = document.getElementById("descriptionEdit").value;
  }

function copyFunction(r) {
    // Get the text field
    var i = r.parentNode.parentNode.rowIndex;
    var copyText = document.getElementById("link-table").rows[i].cells[3].innerText
  
     // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);
}

function deleteRowLink(r) {
    var row_count = $("#link-table tbody tr").length - 1;
    var i = r.parentNode.parentNode.rowIndex; 
    document.getElementById("link-table").deleteRow(i);
    var row_after_i = row_count- i
    if (row_after_i != 0) {
      console.log("123")
      for (let j = i; j <= row_count-1; j++) {
        console.log(j)
        document.getElementById("link-table").rows[j].cells[0].innerHTML = j
      }
    }
    
}

function addRowToTable() {
    getDataFromAddInput()
    var colCount = $("#link-table tbody tr").length;
    var html = `<button type="button" class="btn btn-link btn-sm btn-rounded" data-mdb-toggle="modal" data-mdb-target="#editModal" 
    onclick="showExistingRowData(this)">
    Edit
  </button>
                <button type="button" class="btn btn-link btn-sm btn-rounded" onclick="copyFunction(this)" >
    Copy
  </button>
                <button type="button" class="btn btn-link btn-sm btn-rounded" onclick="deleteRowLink(this)">
    Delete
  </button>`;
    var table = document.getElementById('link-table');
    var row = table.insertRow(colCount); //-1 to the last row
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);
    cell1.innerHTML = colCount;
    cell2.innerHTML = name_link;
    cell3.innerHTML = env;
    cell4.innerHTML = link
    cell5.innerHTML = type;
    cell6.innerHTML = description;
    cell7.innerHTML = createdBy;
    cell8.innerHTML = new Date();
    cell9.innerHTML = html;
}


/*function clear_input() {
    console.log("444")
    $('#add-modal').on('hidden.bs.modal', function(e){
        $(this).find('#add-modal')[0].reset();           
 });
}*/
/*$('#add-modal').on('hidden.bs.modal', function (e) {
    $(":input").val('');  
    $("select").change();
})*/

function showExistingRowData(r) {
    var i = r.parentNode.parentNode.rowIndex;
    editRow = i;
    name_link = document.getElementById("link-table").rows[i].cells[1].innerText
    env = document.getElementById("link-table").rows[i].cells[2].innerText
    link = document.getElementById("link-table").rows[i].cells[3].innerText
    type = document.getElementById("link-table").rows[i].cells[4].innerText
    description = document.getElementById("link-table").rows[i].cells[5].innerText
    createdBy = document.getElementById("link-table").rows[i].cells[6].innerText

    document.getElementById("nameEdit").value = name_link
    document.getElementById("envEdit").value = env
    document.getElementById("linkEdit").value = link
    document.getElementById("typeEdit").value = type
    document.getElementById("descriptionEdit").value = description
    document.getElementById("createdByEdit").value = createdBy
}

function editRowToTable(r) {
    getDataFromEditInput()
    console.log(document.getElementById("link-table").rows[editRow])
    document.getElementById("link-table").rows[editRow].cells[1].innerHTML = name_link
    document.getElementById("link-table").rows[editRow].cells[2].innerHTML = env
    document.getElementById("link-table").rows[editRow].cells[3].innerHTML = link
    document.getElementById("link-table").rows[editRow].cells[4].innerHTML = type
    document.getElementById("link-table").rows[editRow].cells[5].innerHTML = description  
    document.getElementById("link-table").rows[editRow].cells[7].innerHTML = new Date()  
}
    