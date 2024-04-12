$(document).ready(function() {
    // Validation which displays the bootstrap banner upon successful submission
    $(document).on("click", "#applicationSubmit", function(event) {

        // Prevent the default form submission behavior until the user has completely filled out the form.
        event.preventDefault();
        
        // Check if all fields are completed
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phoneNumber = document.getElementById("phoneNumber").value;
        var resume = document.getElementById("resume").value;
        var coverLetter = document.getElementById("coverLetter").value;

        // Validation for Name field
        // if the name is empty, or the name doesn't include a length of two with a space between, fail validation.
        if (name.trim() === '' || name.trim().split(' ').length !== 2) {
            alert("Please provide your full name with both first and last names separated by a space.");
            
            // Do not submit the form if validation fails
            return false;
        }
        

        // Validation for the rest of the data. Grouped together as they are similar.
        else if (email == '' || resume == '' || coverLetter == '' || phoneNumber.length < 12) {
            alert("Please complete all fields.");

            // Do not submit the form if validation fails
            return false;
        } else {
            // Submit the form if validation passes.
            document.getElementById("applicationForm").submit();
            
            alert("Application Successfully Submitted.");
        }
    });

    // Grab the ol numbah
    var phoneNumberElement = document.getElementById("phoneNumber");

    // Add dashes in phone number form. https://codepen.io/alphaborel/pen/GxVGpR 
    phoneNumberElement.addEventListener("keyup", function(event){
        if (event.key !== "Backspace" && (phoneNumberElement.value.length === 3 || phoneNumberElement.value.length === 7)){
            phoneNumberElement.value += "-";
        }
    });
});


