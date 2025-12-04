import axios from './axios';

export const verifyApi = {
    checkStatus() {
        return axios.get('/user/verification-status');
    }
};