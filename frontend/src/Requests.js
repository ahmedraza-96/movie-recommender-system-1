const key = process.env.REACT_APP_API_KEY || "8321fba1bd0a71fd23430a1b4d42bfd9";

const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  requestSearch: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&query=`
};

console.log(key);

export default requests;
