import userFile from "../json/userInfo.json" assert { type: 'json' };

//Function for clicking the submit button
document.getElementById("userForm").addEventListener("submit", function(event) {
    //prevent the damn form from submitting
    event.preventDefault();
    
    //get the email and password from the form
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    //Log the password (for debugging) needs deleting
    console.log(GetPasswordFromEmail(email));

    //call the get password method and check if it matches
    if (GetPasswordFromEmail(email) == password) {
        alert("Login successful!");

        //call get access and check if the user has administrative access. If they do: open the admin page with the admin tools
        if (GetAccessFromEmail(email) == true){
            openPage('../html/adminPage.html');
        }
        //open the index if they aren't admin
        else{
            openPage('../html/index.html');
        }

    } 
    //let the user know they are dumb and forgot their password
    else{
        alert("Invalid email or password. Please try again.");
    }
});

//this function basically just pulls the password attributed to the email
function GetPasswordFromEmail(email){
    var returnValue;
userFile.users.forEach(account => {
    if (email == account.email)
    {
        returnValue = account.password;
    }
});
return returnValue;
}

//this function basically just returns true/false if they are an admin or not
function GetAccessFromEmail(email){
    var returnValue;
userFile.users.forEach(account => {
    if (email == account.email){
        if (account.admin == "true"){
            returnValue = true;
        }
        else{
            returnValue = false;
        }  
    }
    
});
return returnValue;
}

//opens page
function openPage(url) {
    window.open(url, '_blank');
}