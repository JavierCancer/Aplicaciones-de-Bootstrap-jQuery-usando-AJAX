var API_BASE_URL = "https://api.github.com";
var USERNAME = "JavierCancer";
var PASSWORD = "javier77";

$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});

/*
Details about repository of GitHub API 
https://developer.github.com/v3/repos/
*/

$("#button_get_gists").click(function(e) {
	e.preventDefault();
	getGists();
});

$("#button_to_create").click(function(e) {
	e.preventDefault();

    var newGist = new Object();	
	newGist.description = $("#description_to_create").val();
 	newGist.public = false;
	var yourObject = { 
	files: {
	 
	content: $("#content_to_create").val()
			}
		
	}
  
    createGist(newGist);
});
		

	
	


//$("#button_delete_gist").click(function(e) {
	//e.preventDefault();
	//getGists();
	
	//})
	
	







function getGists() {
	var url = API_BASE_URL + '/users/' + USERNAME + '/gists?page=1&per_page=4';
	$("#gist_result").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var gists = data;
				
				$.each(gists, function(i, v) {
					var gists = v;

					$('<h4> Creado en: ' + gists.created_at + '</h4>').appendTo($('#gist_result'));
					$('<p>').appendTo($('#gist_result'));	
					$('<strong> ID: </strong> ' + gists.id + '<br>').appendTo($('#gist_result'));
					$('<strong> URL: </strong> ' + gists.html_url + '<br>').appendTo($('#gist_result'));
					$('<strong> Description: </strong> ' + gists.description + '<br>').appendTo($('#gist_result'));
					$('</p>').appendTo($('#gist_result'));
				});
				

	}).fail(function() {
		$("#gist_result").text("No hay gist.");
	});
	
	
}

function createGist(Gist) {
	var url = API_BASE_URL + '/gists';
	var data = JSON.stringify(Gist);

	$("#create_result").text('');

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
		data : data,
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Gist Created</div>').appendTo($("#create_result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error to create Gist </div>').appendTo($("#create_result"));
	});

}


function deleteGist(Gist) {
	var url = API_BASE_URL + '/gists/' + Gist.id;
	var data = JSON.stringify(Gist);

	$("#delete_result").text('');

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
		data : data,
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Gist Deleted</div>').appendTo($("#delete_result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#delete_result"));
	});

}







