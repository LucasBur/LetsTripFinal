import axios from 'axios';

const headers = {
    "Content-Type": "application/json"
};
const url = "http://localhost:4000";

export default {
    // User
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
            console.log('log :', userData)
        } catch (error) {
            console.log(error)
        }
    },

    isAuth: () => {
        return localStorage.getItem("token") !== null;
    },

    logout: () => {
        localStorage.clear();
        window.location = '/'
    },

    // Roadmap

    createRoadmap: async (values) => {
        try {
            const roadmapData = await axios.post(`${url}/CreateRoadMap`, values, { headers: headers });
            console.log('roadmap created : ', roadmapData)
        } catch (error) {
            console.log(error)
        }
    },

    // Activity

    createActivity: async (values) => {    
        try {
            const activityData = await axios.post(`${url}/CreateActivity`, values, {headers: headers});
            console.log('activity created : ', activityData);
        }
        catch (error) {
            console.log(error)
        }
    }
}