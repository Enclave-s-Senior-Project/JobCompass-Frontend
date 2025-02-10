import axios from 'axios';
import { SignUpCredentials } from 'form-credentials';

export const register = async (data: Omit<SignUpCredentials, 'confirmPassword'>) => {
    console.log('data', data);
    const temp = await axios.post('http://localhost:3001/api/v1/auth/register', data);
    return temp.data?.payload;
};
