import axios from 'axios';
// import Storage from './storage';

// Add a request interceptor
// axios.interceptors.request.use(async (config) => {
//     const token = await Storage.getItem('token');
//     if ( token != null ) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     // Do something before request is sent
//     // console.log("AXIOS REQUEST", config);
//     return config;
//   }, function (error) {
//     console.log("AXIOS REQUEST ERROR");
//     // Do something with request error
//     return Promise.reject(error);
// });