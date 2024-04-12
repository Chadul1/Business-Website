import userFile from "../json/userInfo.json" assert { type: 'json' };

document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    

    if (!CheckEmailTaken(email)){

        var newUser = {
            email: email,
            password: password,
            admin: "false"
        };
        
        userFile.users.push(newUser);
        console.log(userFile.users);
        alert("Account created successfully");
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
    }
    else{
        alert("This email has already has an account associated with it")
    }
});

function CheckEmailTaken(email){
    var returnValue = false;
userFile.users.forEach(account => {
    if (email == account.email)
    {
        console.log("Email found and taken already")
        returnValue = true;
    }
});
    return returnValue;
}