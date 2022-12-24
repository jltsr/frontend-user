import axios from 'axios';
import config from '../config/config';

const signup = async(data)=>{
    try {
        const result = await axios.post(`${config.domain}/signup`,data);
        return result;    
    } catch (error) {
        return error;
    }
}

const signin = async(data)=>{
    try {
        const result = await axios.post(`${config.domain}/signin`,data);
        return result;    
    } catch (error) {
        return error;
    }
}

const userlist = async()=>{
    try {
        const result = await axios.get(`${config.domain}/user`)
        return result.data
    } catch (error) {
        return await error.message
    }
}


export default {
    signin,
    signup,
    userlist
}