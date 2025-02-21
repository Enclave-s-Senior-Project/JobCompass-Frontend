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
    address: Address;
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
