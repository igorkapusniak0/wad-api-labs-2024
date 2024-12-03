export const getMovies = async () => {
    const response = await  fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=17a0d4273749aa114dd72c6fbd587469&language=en-US&include_adult=false&page=1`
    )
    return response.json()
  };