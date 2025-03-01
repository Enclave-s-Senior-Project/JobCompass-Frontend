import { StaticImageData } from 'next/image';

export interface Language {
    imageUrl: string | StaticImageData;
    title: string;
}

export interface Address {
    isActive: boolean;
    addressId: string;
    country: string;
    city: string;
    street: string;
    zipCode: string;
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
