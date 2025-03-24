import { PersonalProfileType, UserType, Address, CandidateProfileType } from './common-types';
import { Categories, Enterprise, Job, Resume, SocialLink, Tag } from './entities';

interface ResponseWithMeta<T> {
    meta: Meta;
    data: T;
}

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
    export type GetAllJobs = ResponseWithMeta<Job[]>;

    export interface FavoriteJobs extends GetAllJobs {}
    export interface EnterpriseJobs extends GetAllJobs {}

    export type GetAllCvByIdProfile = Resume[];
    export type GetAllTag = {
        data: Tag[];
        meta: Meta;
    };
    export type GetCategories = Categories[];
    export type GetAddressByEnterprisesId = Enterprise & {
        addresses: Address[];
    };
    export type GetDetailJob = Job;
    export type getDataRegisterEnterprise = Enterprise;
    export type GetDataEnterprises = {
        data: Enterprise[];
        meta: Meta;
    };

    export type GetCategoriesPrimary = ResponseWithMeta<Categories[]>;

    export type GetCategoriesChild = GetCategoriesPrimary;

    export type UploadCV = Resume;
}

export namespace DetailedRequest {
    export interface Pagination {
        order?: 'ASC' | 'DESC';
        page?: number;
        take?: number;
        options?: string;
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

    export interface UpdateEnterprisesCompanyFounding {
        foundedIn: Date;
        organizationType: string;
        teamSize: string;
        industryType: string;
        bio: string;
        email: string;
        companyVision: string;
        description: string;
    }

    export interface UpdatePersonalProfile extends Omit<PersonalProfileType, 'avatarFile' | 'backgroundFile'> {
        profileUrl?: string;
        pageUrl?: string;
    }

    export interface UpdateCandidateProfile extends CandidateProfileType {}

    export type UpdateCandidateSocialLinks = SocialLink[];
    export type UpdateEnterpriseSocialLinks = SocialLink[];
    export interface postJobCredentials {
        name: string;
        lowestWage: number;
        highestWage: number;
        description: string;
        responsibility: string;
        type: string;
        experience: number;
        deadline: string;
        introImg: string;
        status: boolean;
        education: string;
        tagIds: string[];
        categoryIds: string[];
        address: string[];
        enterpriseBenefits: string;
        specializationIds: string[];
    }
    export interface PostEnterprisesCredentials {
        name: string;
        email: string;
        phone: string;
        description: string;
        enterpriseBenefits: string;
        companyVision: string;
        logoUrl: string;
        backgroundImageUrl: string;
        foundedIn: string;
        organizationType: string;
        teamSize: string;
        industryType: string;
        bio: string;
        status: string;
    }
    export interface UpdateEnterprisesCompany {
        name: string | null;
        logoUrl?: string | null;
        backgroundImageUrl?: string | null;
        description: string | null;
        phone: string | null;
    }

    export interface GetTagsByName extends Pagination {
        name: string;
    }
    export interface ParamListJobsOfEnterprise {
        enterpriseId: string;
        order?: 'ASC' | 'DESC';
        page?: number;
        take?: number;
        status?: boolean;
    }

    export interface GetEnterpriseJobs extends Pagination {
        enterpriseId: string;
    }
    export interface CheckWishlist {
        userId: string;
    }

    export interface CVUpload {
        cvName: string;
        cvUrl: string;
        isPublished: boolean;
        size: number;
    }
}
