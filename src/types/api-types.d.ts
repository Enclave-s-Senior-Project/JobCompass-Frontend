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
    interface Job {
        createdAt: string;
        updatedAt: string;
        isActive: boolean;
        jobId: string;
        name: string;
        lowestWage: string;
        highestWage: string;
        description: string;
        type: string;
        experience: number;
        deadline: string;
        introImg: string;
        status: boolean;
        enterprise: Enterprise;
        address: Address;
    }
    interface Enterprise {
        createdAt: string;
        updatedAt: string;
        isActive: boolean;
        enterpriseId: string;
        name: string;
        email: string;
        phone: string;
        description: string;
        enterpriseBenefits: string;
        companyVision: string;
        logoUrl: string;
        foundedIn: string;
        organizationType: string;
        teamSize: string;
        industryType: string;
        bio: string;
        isPremium: boolean;
        expiredPremium: string;
    }
    interface Meta {
        page: string;
        take: string;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
    }
    interface Address {
        isActive: boolean;
        country: string;
        city: string;
        street: string;
        zipCode: number;
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
        type ForgetPassword = any;
        type ResetPassword = any;
        interface JobCardProps {
            id: string;
            title: string;
            company: string;
            location: string;
            type: string;
            applicants: string;
            featured?: boolean;
            salary: string;
            logo: string;
        }
        interface GetAllJobs {
            data: Job[];
            meta: {
                page: string;
                take: string;
                itemCount: number;
                pageCount: number;
                hasPreviousPage: boolean;
                hasNextPage: boolean;
            };
        }
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
            email: string;
            code: string;
        }

        interface ForgetPasswordCredentials {
            email: string;
        }

        interface ResetPasswordRequest extends ForgetPasswordRequest {
            newPassword: string;
            token: string;
            iv: string;
        }
        interface SearchFilterListJobsCredentials {
            keyword: string;
            location: string;
            category: string;
            advance: string;
        }
        interface ParamListJobsCredentials {
            order: string;
            page: number;
            take: number;
            option: string;
        }
    }
}
