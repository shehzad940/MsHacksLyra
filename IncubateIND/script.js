$(function() {
	$("#goto_login").click(function() {
		$("#login_form").show('100');
		$("#register_form").hide('100');
	});
	$("#goto_register").click(function() {
		$("#register_form").show('100');
		$("#login_form").hide('100');
	});

	$("#register_form").submit(function(e) {
		e.preventDefault();
		let data = formToObj('register_form');
		console.log(data);
		showLoader(1);
		$.ajax({
            type: "POST",
            url: "http://10.104.202.39:8000/api/users/register/",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status, jqXHR) {
            	showLoader(0);
            	M.toast({html: 'You have successfully registered. We will contact you soon'})
            	// $("#goto_login").trigger('click');
            	$("#register_form").trigger("reset");
            },
            error: function (jqXHR, status) {
                console.log(status);
            }
        });
	});

	$("#login_form").submit(function(e) {
		e.preventDefault();
		let data = formToObj('login_form');
		console.log(data);
    	showLoader(1);
		$.ajax({
            type: "POST",
            url: "http://10.104.202.39:8000/api/users/login/",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
            	showLoader(0);
            	console.log(data);
            	// $("#goto_login").trigger('click');
            	// $("#register_form").trigger("reset");
            },
            error: function (jqXHR, status) {
                console.log(status, jqXHR);
            }
        });
	});
});	



function showLoader(v) {
	if (v) {
		$("#loader").show();
	} else {
		$("#loader").hide();
	}
}

function formToObj(id) {
	let obj = {};
	$("#"+id+" input").each(function() {
		obj[$(this).attr('name')] = $(this).val();
	});
	return obj;
}