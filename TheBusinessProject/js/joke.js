fetchJoke();

//Fetches a joke and displays it upon click.
async function fetchJoke(){
    try {
        ///gets the joke in its raw form.
        const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
        //Checks to see if the form is valid, if not. It throws and error.
        if(!response.ok){
            throw new Error('Could not fetch resource.');
        } 
        ///Changes the data to a json file and then creates the joke from the given information.
        const data = await response.json();
        console.log(data);
        const joke = createJoke(data);
        ///Grabs the HTML elements and sets them to the joke variable and to be visible.
        const jokeBox = document.getElementById('jokeBox');
        const jokeContainer = document.getElementById('jokeContainer');
        jokeContainer.style.display = 'block';
        jokeBox.textContent = joke;
    }
    ///catches errors. if there's an error, the joke section doesn't show up.
    catch(error){
        console.log(error);
    }
}

///Creates the joke, if its in two parts. It combines them, else, it just returns the joke.
function createJoke(data){
    joke = '';

    if(data.type == "twopart"){
        return joke = data.setup + "\n" + data.delivery;
    }
    return joke = data.joke;
}