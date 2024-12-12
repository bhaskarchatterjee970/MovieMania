const searchForm = document.querySelector('form')
const movieContainer = document.querySelector('.movie-container')
const inputBox = document.querySelector('.inputBox')
const heading = document.querySelector('.heading')


searchForm.addEventListener('click',(e)=>{
    e.preventDefault()
    // console.log(inputBox.value);
    const movieName = inputBox.value.trim()
    if(movieName !== ''){
        getMovieDetails(movieName)
    }
    else{
        heading.innerHTML = `<h1>Enter movie name to get movie details</h1>`
    }
})

//Fetch movie detail from api
const getMovieDetails = async (movie)=>{
    try {
        const myAPIKey = "c83e5748"
        const url = `http://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`
        const respose = await fetch(url)
        const data = await respose.json()
        console.log(data);
        showMovieData(data)
    } catch (error) {
        heading.innerHTML = `<h1>No movie found</h1>`   
    }
}

//show movie details on screen
const showMovieData = (data)=>{
    movieContainer.innerHTML = ""
    const{Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data
    
        // Dynamically create a new element
        const movieElement = document.createElement("div");
        movieElement.classList.add('movie-Element');
    
        movieElement.innerHTML = `
            <div style="display: flex;line-height:1.4; flex-direction: column; align-items: center;">
                <h1 style="font-size:30px"><strong>${Title}</strong></h1>
                <p><strong>Rating: &#11088;</strong> ${imdbRating}</p>
            </div>
            <div style="margin-top:3px; line-height:2">
                <p><strong>Genre: </strong> ${Genre}</p>
                <p><strong>Released Date: </strong> ${Released}</p>
                <p><strong>Duration: </strong> ${Runtime}</p>
                <p><strong>Cast: </strong> ${Actors}</p>
                <p><strong>Plot: </strong> ${Plot}</p>
            </div>
        `;
        movieElement.style.gap = "8px"

        const moviePoster = document.createElement('div')
        moviePoster.classList.add('movie-poster', 'h-auto', 'w-1/2',)
        moviePoster.innerHTML = `<img src=${Poster}/>`
    
        // Append the element to the container
        movieContainer.appendChild(moviePoster)
        movieContainer.appendChild(movieElement);
    };
    


//------Toggle between light/dark mode-------
const toggleBtn = ()=>{
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    themeToggle.addEventListener('click',(e)=>{
        e.preventDefault()
    
        if(e.target.innerHTML === 'Switch to Dark Mode'){
            body.style.backgroundColor = "black"
            body.style.color = "white"
            e.target.innerHTML = 'Switch to Light Mode'
            e.target.style.backgroundColor = 'white'
            e.target.style.color = 'black'
            heading.style.color = 'white'
        }
        else if(e.target.innerHTML === 'Switch to Light Mode'){
            body.style.backgroundColor = "white"
            body.style.color = "black"
            e.target.innerHTML = 'Switch to Dark Mode'
            e.target.style.backgroundColor = '#2563eb'
            e.target.style.color = 'white'
            heading.style.color = 'black'
        }
    })
}
toggleBtn()
//------Toggle between light/dark mode-------


