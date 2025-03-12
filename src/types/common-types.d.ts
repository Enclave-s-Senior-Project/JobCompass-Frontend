import { StaticImageData } from 'next/image';

export interface Language {
    imageUrl: string | StaticImageData;
    title: string;
}

export interface Address {
    isActive: boolean;
    country: string;
    city: string;
    street: string;
    zipCode: number;
}

export interface UserType {
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    accountId: string;
    email: string;
    status: string;
    roles: string[];
}

export type SocialType = 'FACEBOOK' | 'TWITTER' | 'INSTAGRAM' | 'YOUTUBE' | 'LINKEDIN';

export type PersonalProfileType = {
    avatarFile: File | null;
    backgroundFile: File | null;
    avatarUrl?: string;
    backgroundUrl?: string;
    fullName: string;
    phone?: string;
    education?: string;
    experience?: string;
    dateOfBirth?: string;
    maritalStatus?: string;
};

export type CandidateProfileType = {
    nationality: string | null;
    gender: string | null;
    introduction: string;
};

export enum OrganizationType {
    PRIVATE = 'PRIVATE',
    FLAT = 'FLAT',
    PUBLIC = 'PUBLIC',
    OUTSOURCE = 'OUTSOURCE',
}

export type CompanyProfileFoundingType = {
    email: string;
    companyVision: string;
    foundedIn: Date;
    organizationType: OrganizationType;
    teamSize: string;
    industryType: string;
    bio: string;
    description: string;
};

export type FormErrors = {
    email: (string | null)[];
    companyVision: (string | null)[];
    foundedIn: (string | null)[];
    organizationType: (string | null)[];
    teamSize: (string | null)[];
    industryType: (string | null)[];
    bio: (string | null)[];
    description: (string | null)[];
};
