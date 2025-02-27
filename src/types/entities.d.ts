import { Address, SocialType } from './common-types';

export interface Job {
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
    addresses: Address[];
    profiles: UserProfile[] | null;
    isFavorite: boolean | null;
}

export interface Enterprise {
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

export interface CV {
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    cvId: string;
    cvUrl: string;
    cvName: string;
}

export interface UserProfile {
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    profileId: string;
    fullName: string;
    profileUrl: string;
    pageUrl: string;
    introduction: string | null;
    phone: string;
    view: number;
    gender: string;
    education: string | null;
    nationality: string;
    dateOfBirth: string;
    maritalStatus: string | null;
    isPremium: boolean;
    expiredPremium: any;
    experience: string | null;
    account_id: string;
}

export interface SocialLink {
    websiteId?: string;
    socialType: SocialType;
    socialLink: string;
}

export interface User {
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    profileId: string;
    fullName: string;
    profileUrl?: string;
    pageUrl?: string;
    introduction?: string;
    phone?: string;
    view: number;
    gender?: string;
    education?: string;
    nationality?: string;
    dateOfBirth?: string;
    maritalStatus?: string;
    isPremium: boolean;
    expiredPremium?: any;
    experience?: string;
    account_id: string;
}
