let data = [];
let toprated = [];
let upcoming = [];
let genresdata = [];
const trendingMovieContainer = document.getElementById("TRENDING")
const topRatedMovieContainer = document.getElementById("Top_rated")
const UpcomingMovieContainer = document.getElementById("Upcoming")

//get api here
async function getMovie() {
    const movieData = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=87a5d77dbd572926d38e95e54d2d748d")
    const movieDatawithJson = await movieData.json();
    data = movieDatawithJson.results
    generateCardDataUI();
}

async function getTopRatedMovie() {
  const topMovieData = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=87a5d77dbd572926d38e95e54d2d748d")
  const topMovieDatawithJson = await topMovieData.json();
  toprated = topMovieDatawithJson.results
  generateTopRatedCardDataUI();
}

async function getUpcomingMovie() {
  const upcomingMovieData = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=87a5d77dbd572926d38e95e54d2d748d")
  const upcomingMovieDatawithJson = await upcomingMovieData.json();
  upcoming = upcomingMovieDatawithJson.results
  generateUpcomingDataUI();
}

// getgenreData
//everygenre has their own ID 
//and ID is in "genres" so call api and get the genre data
// after that create a function to compare the movie genre id with the genre data
async function getGenreData() {
  const genreData = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=87a5d77dbd572926d38e95e54d2d748d")
  const genreDatawithJson = await genreData.json();
  genresdata = genreDatawithJson.genres

  
}

getGenreData();
//////////////////////////////////////////////////// below is create html functions
function genreDatatoGenre(id){
  for (movietype of genresdata){
    if(movietype.id === id){
      return movietype.name;
    }
  }
}

function createTrendingPoster(movie){
    let genre = (movie.genre_ids).map(genreDatatoGenre);
    const cardUI = `<div class="card "style="width: 18rem;display: inline-block;">
    <img class="card-img-top" src=${"https://image.tmdb.org/t/p/w500" + movie.poster_path}"} alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${movie.original_title}</h5>   
      <p class="card-text">${movie.release_date}</p>
      <p class="text">${movie.overview}</p>
      <p class="text">Genre: ${genre}</p>
      <a href="#" class="btn btn-primary">Buy Ticket</a>
    </div>
  </div>`

    trendingMovieContainer.innerHTML += cardUI; //Trending
}

function createTopRatedPoster(topMovie){
  let genre = (topMovie.genre_ids).map(genreDatatoGenre);
  const cardUI = `<div class="card" style="width: 18rem; display: inline-block;">
  <img class="card-img-top" src=${"https://image.tmdb.org/t/p/w500" + topMovie.poster_path}"} alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${topMovie.original_title}</h5>   
    <p class="card-text">${topMovie.release_date}</p>
    <p class="text">${topMovie.overview}</p>
    <p class="text">Genre: ${genre}</p>
    <a href="#" class="btn btn-primary">Buy Ticket</a>
  </div>
</div>`

  topRatedMovieContainer.innerHTML += cardUI; //toprated 
}

function createUpcomingPoster(upComingmovie){
  let genre = (upComingmovie.genre_ids).map(genreDatatoGenre);
  const cardUI = `<div class="card" style="width: 18rem; display: inline-block;">
  <img class="card-img-top" src=${"https://image.tmdb.org/t/p/w500" + upComingmovie.poster_path}"} alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${upComingmovie.original_title}</h5>   
    <p class="card-text">${upComingmovie.release_date}</p>
    <p class="text">${upComingmovie.overview}</p>
    <p class="text">Genre: ${genre}</p>
    <a href="#" class="btn btn-primary">Buy Ticket</a>
  </div>
</div>`

UpcomingMovieContainer.innerHTML += cardUI; //Upcoming
}


function generateCardDataUI(){
    for(let movie of data){
        createTrendingPoster(movie);
    }
}

function generateTopRatedCardDataUI(){
  for(let topMovie of toprated){
      createTopRatedPoster(topMovie);
  }
}

function generateUpcomingDataUI(){
  for(let upComingmovie of upcoming){
      createUpcomingPoster(upComingmovie);
  }
}


getMovie();
getTopRatedMovie();
getUpcomingMovie();