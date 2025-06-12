import { Categories } from './entities';

export interface Country {
    cities: string[];
    flag: string;
}

export interface Address {
    addressId?: string;
    isActive?: boolean;
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

export interface CandidateProfileType {
    industryId: string | null;
    majorityId: string | null;
    nationality: string | null;
    gender: string | null;
    introduction: string;
}

export type CompanyProfileFoundingType = {
    email: string;
    companyVision: string;
    foundedIn: Date;
    organizationType: OrganizationType;
    teamSize: string;
    industryType: Categories[];
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

export type RoleAIConversation = 'user' | 'assistant';

export type HistoryQuestion = {
    content: string;
    role: RoleAIConversation;
};

export interface AIChatResponse {
    id: string;
    choices: AIChatChoice[];
    created: number;
    model: string;
    object: string;
    service_tier: string;
    system_fingerprint: any;
    usage: AIChatUsage;
}

export interface AIChatChoice {
    finish_reason: string;
    index: number;
    logprobs: any;
    message: AIChatMessage;
}

export interface AIChatMessage {
    content: string;
    refusal: any;
    role: 'user' | 'assistant';
    audio: any;
    function_call: any;
    tool_calls: any;
    annotations: any[];
    timestamp: number;
    failed?: boolean;
}

export interface AIChatUsage {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
    completion_tokens_details: AIChatCompletionTokens;
    prompt_tokens_details: AIChatPromptTokens;
}

export interface AIChatCompletionTokens {
    accepted_prediction_tokens: number;
    audio_tokens: number;
    reasoning_tokens: number;
    rejected_prediction_tokens: number;
}

export interface AIChatPromptTokens {
    audio_tokens: number;
    cached_tokens: number;
}
