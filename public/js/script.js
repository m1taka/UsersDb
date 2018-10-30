app = () => {

	let URL = "api/persons";

	//GET request
	let getData = () => {
		$.ajax({
			type: "GET",
			url: URL,
			success: (data) => {

				let tbody = $('tbody');

				tbody.html('');

				$.each(data, (i, f) => {
					tbody.append('\
						<tr>\
							<td class="data-id" style="display:none">'+ f._id + '</td>\
							<td class="name">' + f.name + '</td>\
							<td class="age">' + f.age + '</td>\
							<td class="job">' + f.job + '</td>\
							<td><button class="btnEdit btn btn-success">Edit </button></td>\
							<td><button class="btnDelete btn btn-danger">Delete </button></td>\
						</tr>\
					');
				});
			},
			error: (jqXHR, status) => {
				console.log("status:" + status);
			}
		});
	};

	//POST request
	let postData = () => {
		$('#inputForm').validate({

			rules: {
				name: {
					required: true,
					maxlength: 200
				},
				age: {
					required: true,
					digits: true,
					max: 100
				},
				job: {
					required: true,
					maxlength: 200
				}
			},

			messages: {
				name: {
					required: "Please enter a name",
				},
				age: {
					required: "Please enter an age",
				},
				job: {
					required: "Please enter a job",
				},
			},

			submitHandler: () => {

				let name = $("#name").val(),
					age = $("#age").val(),
					job = $("#job").val();

				$.ajax({
					url: URL,
					type: "POST",
					data: { name: name, age: age, job: job },
					success: (data) => {
						console.log('Added: ' + JSON.stringify(data));
						getData();
					},
					error: (jqXHR, status) => {
						console.log("status:" + status);
					}
				});
			}
		});
	};

	//GET one person request
	function viewDataById() {

		let rowElement = $(this).closest('tr');
		let id = rowElement.find('.data-id').text();

		let name = rowElement.find('.name').val();
		let age = rowElement.find('.age').val();
		let job = rowElement.find('.job').val();

		$.ajax({
			url: URL + "/" + id,
			type: "GET",
			contentType: 'application/json',
			data: JSON.stringify({ name: name, age: age, job: job }),
			success: (data) => {
				$('#modalId').show();

				$('.modal-id').val(data._id);
				$('.modal-element#name').val(data.name);
				$('.modal-element#age').val(data.age);
				$('.modal-element#job').val(data.job);
			},
			error: (jqXHR, status, err) => {
				console.log("status:" + status);
				console.log(err);
			}
		});
	};

	//PUT request
	function saveData() {

		$('.modal-content').validate({
			rules: {
				name: {
					required: true,
					maxlength: 200
				},
				age: {
					required: true,
					digits: true,
					max: 100
				},
				job: {
					required: true,
					maxlength: 200					
				}
			},

			messages: {
				name: {
					required: "Please enter a name",
				},
				age: {
					required: "Please enter an age",
				},
				job: {
					required: "Please enter a job",
				},
			},

			submitHandler: function () {

				let id = $('.modal-id').val();

				let newName = $('.modal-element#name').val();
				let newAge = $('.modal-element#age').val();
				let newJob = $('.modal-element#job').val();

				$.ajax({
					url: URL + "/" + id,
					type: "PUT",
					contentType: "application/json",
					data: JSON.stringify({ name: newName, age: newAge, job: newJob }),
					success: (data) => {
						console.log("Data updated:" + JSON.stringify(data));
						$('#modalId').hide();
						getData();
					},
					error: (jqXHR, status) => {
						console.log("status:" + status);
					}
				});	
			}
		});
	};

	//DELETE request
	function deleteData() {

		let rowElement = $(this).closest('tr');
		let id = rowElement.find('.data-id').text();

		let ok = confirm("Are you sure you want to delete?");

		if (ok) {
			$.ajax({
				url: URL + "/" + id,
				type: "DELETE",
				success: function (data) {
					console.log(JSON.stringify(data));
					getData();
				},
				error: (jqXHR, status) => {
					alert("status:" + status);
				}
			});
		}
	};



	//GET handler
	$(document).ready(getData());

	//POST handler
	$(document).on('click', '#btnAdd', postData);

	//GET one person handler
	$('table').on('click', '.btnEdit', viewDataById);

	//PUT handler
	$(document).on('click', '#btnSubmit', saveData);

	//DELETE handler
	$('table').on('click', '.btnDelete', deleteData);

	let year = new Date().getFullYear();
	//Set year
	$("#year").html(year).css('fontSize', '0.9rem');


	let modal = document.getElementById('modalId');
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = (event) => {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
};

app();
