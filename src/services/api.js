import axios from 'axios';

// chave da api -> bbceabd3a5bac2696cc4eb748addc44d

//'https://api.themoviedb.org/3/movie/now_playing?api_key=bbceabd3a5bac2696cc4eb748addc44d

//Base da URL -> https://api.themoviedb.org/3/


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;
