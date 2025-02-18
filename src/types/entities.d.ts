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
