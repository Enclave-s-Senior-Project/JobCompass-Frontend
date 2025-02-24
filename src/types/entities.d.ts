import { profiles } from './entities.d';
import { Address } from './common-types';

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
    profiles: profile[] | null;
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
