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
        $.each(filter(data, document.getElementById("searchBar").textContent), function(){
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
window.addEventListener("keydown", populateTable, false);
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
    populateCountry1Info()
  

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
    populateCountry2Info()
};
function populateCountry2Info(){
    $('#country2InfoName').text(thisCountry2Object.country);
    $('#country2InfoCall').text(thisCountry2Object.callCode);
    $('#country2InfoISO').text(thisCountry2Object.ISO);
    $('#country2InfoLit').text(thisCountry2Object.litRate);
    $('#country2InfoPop').text(thisCountry2Object.pop);
    $('#country2InfoArea').text(thisCountry2Object.area);
    $('#country2InfoCapital').text(thisCountry2Object.capital);
    $('#country2InfoCurrency').text(thisCountry2Object.currency);

}
function populateCountry1Info(){
    $('#country1InfoName').text(thisCountry1Object.country);
    $('#country1InfoCall').text(thisCountry1Object.callCode);
    $('#country1InfoISO').text(thisCountry1Object.ISO);
    $('#country1InfoLit').text(thisCountry1Object.litRate);
    $('#country1InfoPop').text(thisCountry1Object.pop);
    $('#country1InfoArea').text(thisCountry1Object.area);
    $('#country1InfoCapital').text(thisCountry1Object.capital);
    $('#country1InfoCurrency').text(thisCountry1Object.currency);
}
function filter(json, qry){
  var filteredList = [];
  for(var i=0; i<Object.keys(json).length; i++){
    var current = json[i].country;
    current = current.toLowerCase();
    qry = qry.toLowerCase();
    if(current.indexOf(qry) !== -1){
      filteredList.push(json[i]); 
    }
    
  }
  return filteredList;
}
function compare(){
  populateCountry1Info();
  populateCountry2Info();
  if(country1ListData.length < 1) {
    alert("Please choose country 1");
  } else if(country2ListData.length < 1) {
    alert("Please choose country 2");
  } else if(thisCountry2Object.litRate == thisCountry1Object.litRate){
    alert("Choose 2 different countries");
  } else {
    
    // change plus to color change
    var country2LitQuery = document.querySelector("#country2InfoLit");
    var country2LitText = country2LitQuery.textContent 
    var country1LitQuery = document.querySelector("#country1InfoLit");
    var country1LitText = country1LitQuery.textContent 
    var litRate2 = thisCountry2Object.litRate;
    var litRate1 = thisCountry1Object.litRate;
    if(country1LitText.substring(country1LitText.length - 1) !== "+" && country2LitText.substring(country2LitText.length - 1) !== "+"){
      if(litRate2 !== "N/A" && litRate1 !== "N/A"){
        
        litRate1 = litRate1.substring(0, litRate1.length - 1);
        litRate2 = litRate2.substring(0,litRate2.length - 1);
        litRate2 = parseInt(litRate2);
        litRate1 = parseInt(litRate1);
        
        if(litRate2 > litRate1){
          country2LitQuery.textContent += "+"
        } else {
          country1LitQuery.textContent += "+"
        }
      } else {
      }
    }
    var pop2 = parseInt(thisCountry2Object.pop);
    var country2PopQuery = document.querySelector("#country2InfoPop");
    var country2PopText = country2PopQuery.textContent;
    var pop1 = parseInt(thisCountry1Object.pop);
    var country1PopQuery = document.querySelector("#country1InfoPop");
    var country1PopText = country1PopQuery.textContent;
    if(country1LitText.substring(country1LitText.length - 1) !== "+" && country2LitText.substring(country2LitText.length - 1) !== "+"){
        if(pop2 > pop1){
            
            country2PopQuery.textContent += "+"
        } else {
            
            country1PopQuery.textContent += "+"
        }
    }
    
    var area2 = parseInt(thisCountry2Object.area);
    var country2AreaQuery = document.querySelector("#country2InfoArea");
    var country2AreaText = country2AreaQuery.textContent;
    var country1AreaQuery = document.querySelector("#country1InfoArea");
    var country1AreaText = country1AreaQuery.textContent;
    var area1 = parseInt(thisCountry1Object.area);
    if(country1AreaText.substring(country1AreaText.length - 1) !== "+" && country2AreaText.substring(country2AreaText.length - 1) !== "+"){
        if(area2 > area1){
            
            country2AreaQuery.textContent += "+"
        } else {
            country1AreaQuery.textContent += "+"
        }
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
