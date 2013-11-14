
$("#reddit-front-page").submit(function( event ) {
    var form = $("#reddit-front-page");
    event.preventDefault();
    var form_data = $(form).serialize();
    var form_url = 'reddit/submit';
    var result_div = form.children('.submit-result');
    $.ajax({
        type: "POST",
        url: form_url,
        data: form_data
    })
    .done(function ( data ) {
        handle_saving_notification(data, result_div);
    })
    .fail(function (request, status, error) {
        show_warning_alert(result_div, "Error saving notification: " + data.error);
    });
});

$("#reddit-front-page-alert").click(function () {
    var form = $("#reddit-front-page-alert")[0].form;
    var result_div = $(form).children('.submit-result');
    show_warning_alert(result_div, 'You have to log in first.');
});

$("#modal-search-city").click(function () {
    var weatherAPI = "/api/weather/search/city";
    $(".modal-city-search-result").empty();
    $.ajax({
        type: "POST",
        url: weatherAPI,
        data:
        { city: $("#modal-city").val() }
    })
    .done(function ( data ) {
        $.each( data.list, function( i, item ) {
            $(".modal-city-search-result").append(item.name + " (" + item.sys.country + ") : " + "<strong>" + item.id + "<br />");
        });
    })
    .fail(function (request, status, error) {
        $(".modal-city-search-result").append("Failure!");
    });
});

$("#weather-min-temp").submit(function( event ) {
    event.preventDefault();
    var form = $("#weather-min-temp");
    var form_url = 'weather/submit';
    var form_data = form.serialize() + "&type=minimum";
    var result_div = form.children('.submit-result');
    result_div.empty();
    $.ajax({
        type: "POST",
        url: form_url,
        data: form_data
    })
    .done(function ( data ) {
        handle_saving_notification(data, result_div);
    })
    .fail(function (request, status, error) {
        result_div.append('Unknown error');
    });
});

$("#show-log-in-alert").click( function () {
    var form = $("#show-log-in-alert")[0].form;
    var result_div = $(form).children('.submit-result');
    show_warning_alert(result_div, 'You have to log in first.');
});

function handle_saving_notification(data, div) {
    if(data.success == 'false') {
        show_warning_alert(div, "Error saving notification: " + data.error);
    } else {
        show_success_alert(div, "Notification saved!");
    }
}

function show_success_alert(div, message) {
    div.empty();
    div.append("<div class=\"alert alert-success alert-dismissable fade in\">" +
            "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>" +
            message + "</div>");
}

function show_warning_alert(div, message) {
    div.empty();
    div.append("<div class=\"alert alert-danger alert-dismissable fade in\">" +
        "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>" +
        message + "</div>");
}