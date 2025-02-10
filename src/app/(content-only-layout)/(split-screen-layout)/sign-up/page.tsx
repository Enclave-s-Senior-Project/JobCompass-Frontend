import { FormSignUp } from '@/components/custom-ui/form-sign-up';
import { ToastContainer } from 'react-toastify';

export default function SignUp() {
    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />
            <FormSignUp />
        </div>
    );
}
