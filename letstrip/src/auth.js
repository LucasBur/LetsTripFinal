import axios from 'axios';

const headers = {
    "Content-Type": "application/json"
};
const url = "http://localhost:4000";

export default {
    signup: async (values) => {
        const userData = await axios.post(`${url}/NewUser`, values, { headers: headers });
        console.log('user created : ', userData)
    },

    login: async (values) => {
        const userData = await axios.post(`${url}/Login`, values, { headers: headers });
        localStorage.setItem("token", userData.data);
        window.location='/roadmap'
        console.log('log : ', userData)
    },

    isAuth: () => {
        return localStorage.getItem("token") !== null;
    },

    logout: () => {
        localStorage.clear();
        window.location='/'
    }
}