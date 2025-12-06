import axios from './axios';

// export const verifyApi = {
//     checkStatus() {
//         return axios.get('/user/verification-status');
//     }
// };

export const verifyApi = {
    checkStatus(user_id) {
        return axios.get(`/user-verification/${user_id}`);
    }
};