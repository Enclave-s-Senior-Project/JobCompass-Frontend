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
