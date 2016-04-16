var countryListData = [];
var country1ListData = [];
var country2ListData = [];
// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/countries/countryList', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            countryListData = data;
            tableContent += '<tr>';
            tableContent += '<td><p class="">' + this.country + '</p></td>';
            tableContent += '<td>' + this.ISO + '</td>';
            tableContent += '<td><a href="#" class="linkchoosecountry1" rel="' + this.country + '">Choose for Country 1</a></td>';
            tableContent += '<td><a href="#" class="linkchoosecountry2" rel="' + this.country + '">Choose for Country 2</a></td>';
            tableContent += '<td><a href="#" class="linkdeletecountry" rel="' + this._id + '">Delete</a></td>';
            tableContent += '</tr>';
        });
        
        // Inject the whole content string into our existing HTML table
        $('#countryList table tbody').html(tableContent);
    });
};
// on click events
$('#countryList table tbody').on('click', 'td a.linkchoosecountry1', showCountry1Info);
$('#countryList table tbody').on('click', 'td a.linkchoosecountry2', showCountry2Info);

var thisCountry1Object;
var thisCountry2Object;
function showCountry1Info(event) {
    // Put list into data 
    country1ListData = countryListData;
    // Prevent Link from Firing
    event.preventDefault();
    // Retrieve username from link rel attribute
    var thisCountry1Name = $(this).attr('rel');
    // Get Index of object based on id value
    var array1Position = country1ListData.map(function(arrayItem) { return arrayItem.country; }).indexOf(thisCountry1Name);
    thisCountry1Object = country1ListData[array1Position];
    //Populate Info Box
    $('#country1InfoName').text(thisCountry1Object.country);
    $('#country1InfoCall').text(thisCountry1Object.callCode);
    $('#country1InfoISO').text(thisCountry1Object.ISO);
    $('#country1InfoLit').text(thisCountry1Object.litRate);
    $('#country1InfoPop').text(thisCountry1Object.pop);
    $('#country1InfoArea').text(thisCountry1Object.area);
    $('#country1InfoCapital').text(thisCountry1Object.capital);
    $('#country1InfoCurrency').text(thisCountry1Object.currency);

  

};
function showCountry2Info(event) {

    // Put list into data
    country2ListData = countryListData;
    // Prevent Link from Firing
    event.preventDefault();
    // Retrieve username from link rel attribute
    var thisCountry2Name = $(this).attr('rel');
    // Get Index of object based on id value
    var array2Position = country2ListData.map(function(arrayItem) { return arrayItem.country; }).indexOf(thisCountry2Name);
    thisCountry2Object = country2ListData[array2Position];
    //Populate Info Box
    $('#country2InfoName').text(thisCountry2Object.country);
    $('#country2InfoCall').text(thisCountry2Object.callCode);
    $('#country2InfoISO').text(thisCountry2Object.ISO);
    $('#country2InfoLit').text(thisCountry2Object.litRate);
    $('#country2InfoPop').text(thisCountry2Object.pop);
    $('#country2InfoArea').text(thisCountry2Object.area);
    $('#country2InfoCapital').text(thisCountry2Object.capital);
    $('#country2InfoCurrency').text(thisCountry2Object.currency);
};
function compare(){
  if(country1ListData.length < 1) {
    alert("Please choose country 1");
  } else if(country2ListData.length < 1) {
    alert("Please choose country 2");
  } else if(thisCountry2Object.litRate == thisCountry1Object.litRate){
    alert("Choose 2 different countries");
  } else {
    
    var country2LitQuery = document.querySelector("#country2InfoLit");
    var country2LitText = document.querySelector("#country2InfoLit").textContent;
    // finish up the + selector
    var country1LitText = document.querySelector("#country1InfoLit").textContent;
    var litRate2 = thisCountry2Object.litRate;
    litRate2 = litRate2.substring(0,litRate2.length - 1);
    var litRate1 = thisCountry1Object.litRate;
    litRate1 = litRate1.substring(0, litRate1.length - 1);
    if(country1LitText.substring(country1LitText.length - 1) !== "+" && country2LitText.substring(country2LitText.length - 1) !== "+"){
      if(litRate2 !== "N/A" && litRate1 !== "N/A"){
        
        litRate2 = parseInt(litRate2);
        litRate1 = parseInt(litRate1);
        console.log(litRate2);
        console.log(litRate1);
        
        if(litRate2 > litRate1){
          country2LitQuery.textContent += "+"
          console.log("yay");
        } else {
          country1LitQuery.textContent += "+"
          console.log("yay");
        }
      } else {
      
      }
    }
    var pop2 = parseInt(thisCountry2Object.pop);
    var pop1 = parseInt(thisCountry1Object.pop);
    if(pop2 > pop1){
      var country2PopText = document.querySelector("#country2InfoPop");
      country2PopText.textContent += "+"
    } else {
      var country1PopText = document.querySelector("#country1InfoPop");
      country1PopText.textContent += "+"
    }
    var area2 = parseInt(thisCountry2Object.area);
    var area1 = parseInt(thisCountry1Object.area);
    if(area2 > area1){
      var country2AreaText = document.querySelector("#country2InfoArea");
      country2AreaText.textContent += "+"
    } else {
      var country1AreaText = document.querySelector("#country1InfoArea");
      country1AreaText.textContent += "+"
    }
  }
}

$('#btnCompare').on('click', compare);
function addCountry(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addCountry input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newCountry = {
            'country': $('#addCountry fieldset input#inputCountryName').val(),
            'callCode': $('#addCountry fieldset input#inputCountryCall').val(),
            'ISO': $('#addCountry fieldset input#inputCountryISO').val(),
            'litRate': $('#addCountry fieldset input#inputCountryLit').val(),
            'pop': $('#addCountry fieldset input#inputCountryPop').val(),
            'area': $('#addCountry fieldset input#inputCountryArea').val(),
            'capital': $('#addCountry fieldset input#inputCountryCapital').val(),
            'currency': $('#addCountry fieldset input#inputCountryCurrency').val(),
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newCountry,
            url: '/countries/addCountry',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addCountry fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};
$('#btnAddCountry').on('click', addCountry);


// Delete Country
function deleteCountry(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this country?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/countries/deleteCountry/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};
// Delete country
$('#countryList table tbody').on('click', 'td a.linkdeletecountry', deleteCountry);
