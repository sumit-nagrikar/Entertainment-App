

// eslint-disable-next-line no-undef
const key = import.meta.env.VITE_API_KEY;
//from the tmdb after the signup
//for authorization
export {key} 

const requests = {
    requestPopular: `https://api.themoviedb.org/3/trending/all/day?api_key=${key}&language=en-US&page={page}`,
    requestTopRatedmovie: `https://api.themoviedb.org/3/trending/all/day?api_key=${key}&language=en-US&page=1`,
    requestMovie: `https://api.themoviedb.org/3/movie/?api_key=${key}&language=en-US&page=1`,
    requestRecommended: `https://api.themoviedb.org/3/trending/all/day?api_key=${key}&language=en-US&page=3`,
    requestComedy: `https://api.themoviedb.org/3/movie/multi?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,
     requestUpcoming: `https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1`,
    requesttvshows:`https://api.themoviedb.org/3/trending/tv/day?api_key=${key}&language=en-US&page=1`,
    requestTopRatedtv:`https://api.themoviedb.org/3/trending/all/day?api_key=${key}&language=en-US&page=1`,
    requestTrending:`https://api.themoviedb.org/3/trending/all/day?api_key=${key}&language=en-US&page=1`
  };

  
  


  export default requests

