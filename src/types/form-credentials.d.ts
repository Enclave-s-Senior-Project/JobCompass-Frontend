declare module 'form-credentials' {
    interface SignInCredentials {
        email: string;
        password: string;
    }

    interface SignUpCredentials {
        full_name: string;
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
    }

    interface ForgetPasswordCredentials {
        email: string;
    }
}
