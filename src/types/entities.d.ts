import { JobStatusEnum } from '@/lib/common-enum';
import { Address, OrganizationType, SocialType } from './common-types';

interface baseEntity {
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
}

export interface Job {
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    jobId: string;
    name: string;
    lowestWage: string;
    highestWage: string;
    description: string;
    responsibility: string;
    type: string;
    experience: number;
    deadline: string;
    introImg: string;
    status: JobStatusEnum;
    education: string;
    categories: Categories[];
    enterprise: Enterprise;
    tags: Tag[] | null;
    addresses: Address[] | null;
    profiles: profile[] | null;
    addresses: Address[];
    profiles: User[] | null;
    isFavorite: boolean | null;
    enterpriseBenefits: string | null;
    applicationCount: number;
    isBoost: boolean;
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
    backgroundImageUrl: string;
    foundedIn: Date;
    organizationType: OrganizationType;
    teamSize: string;
    industryType: string;
    bio: string;
    isPremium: boolean;
    expiredPremium: string;
    status: string | null;
    enterpriseId: string;
    addresses: Address[] | null;
}

export interface CV {
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    cvId: string;
    cvUrl: string;
    cvName: string;
    size: number;
    isPublished: boolean;
}

export interface SocialLink {
    websiteId?: string;
    socialType: SocialType;
    socialLink: string;
}

export type Role = 'USER' | 'ENTERPRISE' | 'ADMIN';

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
    roles: Role[];
    industry: Pick<Categories, 'categoryId' | 'categoryName'>;
    majority: Pick<Categories, 'categoryId' | 'categoryName'>;
}
export interface Tag {
    isActive: boolean;
    tagId: string;
    name: string;
    color: string;
    backgroundColor: string;
}

export interface Categories {
    isActive: any;
    categoryId: string;
    categoryName: string;
    parent: any;
}

export interface CandidatesApplied {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
    profile: User;
    job: Job;
}

export interface Resume extends CV {}

export interface AppliedJob extends baseEntity {
    appliedJobId: string;
    coverLetter: string;
    status: string;
    job: Job;
    address: Address[];
}
