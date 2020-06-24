import axios from 'axios';

const headers = {
    "Content-Type": "application/json"
};
const url = "http://localhost:4000";

export default {
    // User
    signup: async (values) => {
        console.log(values)
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
            if (userData.data === false) {
                alert('Mail ou mot de passe incorect');
            } else {
                window.location = '/dashboard'
                localStorage.setItem("token", userData.data);
                console.log('log :', userData)
            }
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

    updateUserProfile: async (values) => {
        console.log('values:', values)
        try {
            const updateUser = await axios.put(`http://localhost:4000/UpdateUser/${values.id}`, values, { headers: headers });
            localStorage.setItem("token", updateUser.data);
            console.log('user info : ', updateUser);
        } catch (error) {
            console.log(`😱 Axios request failed: ${error}`)
        }
    },

    updatePassword: async (values) => {
        console.log('values:', values)
        try {
            const updatePw = await axios.put(`http://localhost:4000/update-password/${values.id}`, 
                values, {headers: headers });
            console.log('updatePw : ', updatePw)
            localStorage.setItem('token', updatePw.data);
        } catch (error) {
            console.error(error)
        }
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

    updateRoadmap: async (values, id) => {
        try {
            const updateRoadmap = await axios.put(`http://localhost:4000/updateRoadmap/${id}`,
                values, { headers: headers });
            console.log('user roadmap info :', updateRoadmap)
        } catch (error) {
            console.log(`😱 ${error}`)
        }
    },

    // Activity

    createActivity: async (values) => {
        try {
            const activityData = await axios.post(`${url}/CreateActivity`, values, { headers: headers });
            console.log('activity created : ', activityData);
        }
        catch (error) {
            console.log(error)
        }
    },

    updateActivity: async (values) => {
        console.log(values);
        try {
            const activityData = await axios.put(`${url}/UpdateActivity/${values.id}`, values, { headers: headers });
            console.log('activity modified: ', activityData);
        }
        catch (error) {
            console.log(error);
        }
    }
}