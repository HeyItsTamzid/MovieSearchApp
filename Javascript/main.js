$(function() {
  $("#searchForm").on("submit", function(e) {
    let searchedText = $("#searchInput").val();
    GetMovies(searchedText);
    e.preventDefault();
  });
});

function GetMovies(searchedText) {
  axios
    .get("https://www.omdbapi.com?s=" + searchedText + "&apikey=84c89108")
    .then(function(response) {
      // handle success
      let movieList = response.data.Search;
      console.log("GetMovies -> resultList", movieList);
      let eachMovie = "";

      $.each(movieList, function(index, movie) {
        eachMovie += `
          <div id="movieCard" class="col-lg-3 col-md-4 col-sm">
            <div class="well text-center">
              <img class="img-fluid" src="${movie.Poster}">
              <p><strong> ${movie.Title} </strong></p>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Details</a>
            </div>
          </div>

        `;

        $("#movies").html(eachMovie);
      });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";

  return false;
}

function getMovieInfo() {
  let movieId = sessionStorage.getItem("movieId");

  axios
    .get("https://www.omdbapi.com?i=" + movieId + "&apikey=84c89108")
    .then(function(response) {
      let movie = response.data;

      let output = `
        
      <div class="card bg-danger mx-auto my-5" style="width: 50vw;">
      <div class="card-header text-center text-white">Movie Info</div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 col-sm ">
            <img src="${movie.Poster}" class="img-fluid" />
          </div>
          <div class="col-md-6 col-sm m-auto">
            <h4 class="card-title text-center text-white">${movie.Title}</h4>
            <p class="card-text">
              <ul class="list-group">
                <li class="list-group-item">
                  <strong> Genre: </strong> ${movie.Genre}
                </li>
                <li class="list-group-item">
                  <strong> Released: </strong> ${movie.Released}
                </li>
                <li class="list-group-item">
                  <strong> Rated: </strong> ${movie.Rated}
                </li>
                <li class="list-group-item">
                  <strong> imdbRating: </strong> ${movie.imdbRating}
                </li>
                <li class="list-group-item">
                  <strong> Director: </strong> ${movie.Director}
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>

      `;

      $("#movie").html(output);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
}
