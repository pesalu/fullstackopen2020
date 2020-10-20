import axios from 'axios';
import { getToken } from './blogs'
const baseUrl = 'http://localhost:3001/api/users';

const getAll = () => {
    const config = {
        params: {},
        headers: { Authorization: getToken() }
    };

    const request = axios.get(baseUrl, config);
    return request.then(response => response.data);
}

export default { getAll };