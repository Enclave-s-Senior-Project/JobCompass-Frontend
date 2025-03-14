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
    avatarUrl: string;
    backgroundUrl: string;
    fullname: string;
    phone: string;
    education: string;
    experience: string;
};

export type CandidateProfileType = {
    nationality: string | null;
    dateOfBirth: string | null;
    gender: string | null;
    maritalStatus: string | null;
    introduction: string;
};
