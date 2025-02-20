import { Button } from '../ui/button';
import { FaFacebookF } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

export function ButtonOptionsSignIn() {
    return (
        <div className="flex items-center flex-wrap justify-between gap-x-5 gap-y-2">
            <Button className="flex-1 h-11 rounded-sm" variant="outline" size="md" type="button">
                <FaFacebookF className="text-primary" /> Sign in with Facebook
            </Button>
            <Button className="flex-1 h-11 rounded-sm" variant="outline" size="md" type="button">
                <FcGoogle /> Sign in with Google
            </Button>
        </div>
    );
}
