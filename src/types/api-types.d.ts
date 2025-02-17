declare module 'api-types' {
    interface ApiResponse<T> {
        payload: {
            code: number;
            message_code;
            value?: T;
        };
        timestamp: number;
    }

    interface UserType {
        createdAt: string;
        updatedAt: string;
        isActive: boolean;
        accountId: string;
        email: string;
        status: string;
        roles: string[];
    }

    namespace DetailedResponse {
        interface RefreshToken {
            tokenType: string;
            accessToken: string;
            accessTokenExpires: number;
        }
        interface SignIn extends RefreshToken {
            user: UserType;
        }
        interface SignUp {
            full_name: string;
            username: string;
            email: string;
            password: string;
        }
        interface VerifyEmail {
            email: string | null;
            code: string;
        }
        interface ForgetPassword {}
    }

    namespace DetailedRequest {
        interface SignInRequest {
            username: string;
            password: string;
        }

        interface SignUpRequest {
            full_name: string;
            username: string;
            email: string;
            password: string;
            confirmPassword: string;
        }

        interface ForgetPasswordRequest {
            email: string;
        }

        interface VerifyEmailRequest {
            email: string | null;
            code: string;
        }

        interface ForgetPasswordCredentials {
            email: string;
        }
    }
}
