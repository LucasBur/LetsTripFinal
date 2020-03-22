import axios from 'axios';

const headers = {
    "Content-Type": "application/json"
};
const url = "http://localhost:4000";

export default {
    signup: async (values) => {
        try {
            const userData = await axios.post(`${url}/NewUser`, values, { headers: headers });
            localStorage.setItem("token", userData.data);
            window.location = '/dashboard'
            console.log('user created : ', userData)
        } catch (error) {
            console.log(error)
        }
    },

    login: async (values) => {
        try {
            const userData = await axios.post(`${url}/Login`, values, { headers: headers });
            localStorage.setItem("token", userData.data);
            window.location = '/dashboard'
            console.log( 'log :' , userData)
        } catch(error) {
            console.log(error)
        }
    },

    isAuth: () => {
        return localStorage.getItem("token") !== null;
    },

    logout: () => {
        localStorage.clear();
        window.location = '/'
    }
}