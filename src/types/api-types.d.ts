import { Category, Job } from './entities';

export interface ApiResponse<T> {
    payload: {
        code: number;
        message_code;
        value?: T;
    };
    timestamp: number;
}

export interface Meta {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export namespace DetailedResponse {
    export interface RefreshToken {
        tokenType: string;
        accessToken: string;
        accessTokenExpires: number;
    }
    export interface SignIn extends RefreshToken {
        user: UserType;
    }
    export interface SignUp {
        full_name: string;
        username: string;
        email: string;
        password: string;
    }
    export interface VerifyEmail {
        email: string | null;
        code: string;
    }
    export type ForgetPassword = any;
    export type ResetPassword = any;
    export interface JobCardProps {
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
    export interface GetAllJobs {
        data: Job[];
        meta: Meta;
    }

    export interface FavoriteJobs extends GetAllJobs {}

    export type GetAllCvByIdProfile = CV[];
    export type GetAllTag = Tag[];
    export type GetCategories = Category[];
}

export namespace DetailedRequest {
    export interface Pagination {
        order?: 'ASC' | 'DESC';
        page?: number;
        take?: number;
        option?: string;
    }

    export interface SignInRequest {
        username: string;
        password: string;
    }

    export interface SignUpRequest {
        full_name: string;
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
    }

    export interface ForgetPasswordRequest {
        email: string;
    }

    export interface VerifyEmailRequest {
        email: string;
        code: string;
    }

    export interface ForgetPasswordCredentials {
        email: string;
    }

    export interface ResetPasswordRequest extends ForgetPasswordRequest {
        newPassword: string;
        token: string;
        iv: string;
    }
    export interface SearchFilterListJobsCredentials {
        keyword: string;
        location: string;
        category: string;
        advance: string;
    }
    export interface ParamListJobsCredentials extends Pagination {}
    export interface FavoriteJobs extends Pagination {}
    export interface ApplyJobCoverLette {
        cvId: string;
        coverLetter: string;
        jobId: string;
    }

    export interface UpdatePersonalProfile {
        profileUrl: string;
        pageUrl: string;
        fullName: string;
        phone?: string;
        education?: string;
        experience?: string;
    }

    export interface UpdateCandidateProfile {
        nationality:string,
        dateOfBirth:string,
        gender:string,
        maritalStatus:string,
        introduction:string
    }
}
