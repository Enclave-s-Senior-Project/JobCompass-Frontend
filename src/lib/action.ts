import { BaseAxios } from './axios';
import { DetailedRequest, PersonalProfileType, SocialLink } from '@/types';
import { toast } from 'react-toastify';
import { errorKeyMessage } from './message-keys';
import {
    applyJobCoverLetterSchema,
    forgetPasswordSchema,
    resetPasswordSchema,
    signUpSchema,
    updatePersonalProfile,
    verifyEmailSchema,
    verifySignInSchema,
    updateCandidateProfile as updateCandidateProfileZ,
    postJobSchema,
    addTagSchema,
    addEnterpriseSchema,
} from './zod-schemas';
import { handleErrorToast } from './utils';
import { ApplyJobService } from '@/services/applyJob.service';
import { AuthService } from '@/services/auth.service';
import { UploadService } from '@/services/upload.service';
import { UserService } from '@/services/user.service';
import { WebsiteService } from '@/services/website.service';
import { getBackgroundColor, getRandomColor } from './random-color';
import { TagService } from '@/services/tag.service';
import { JobService } from '@/services/job.service';
import { EnterpriseService } from '@/services/enterprises.service';

export const signInSubmit = async (currentState: DetailedRequest.SignInRequest, formData: FormData) => {
    const username = formData.get('username')?.toString() ?? '';
    const password = formData.get('password')?.toString() ?? '';
    const data = { username, password };
    const axios = new BaseAxios('auth');
    const validate = verifySignInSchema.safeParse(data);

    currentState.username = username;
    currentState.password = password;

    if (!validate.success) {
        return {
            ...currentState,
            errors: {
                ...validate.error.flatten().fieldErrors,
            },
            success: false,
        };
    }

    try {
        const res = await AuthService.login(data);
        if (res.value)
            axios.storeTokenInfo(res.value?.accessToken as string, res.value?.tokenType, res.value?.accessTokenExpires);
        return {
            ...currentState,
            errors: {},
            success: true,
        };
    } catch (err: any) {
        handleErrorToast(err);
    }

    return {
        ...currentState,
        errors: {},
        success: false,
    };
};

export const signUpSubmit = async (currentState: DetailedRequest.SignUpRequest, formData: FormData) => {
    const formValue = {
        full_name: formData.get('full_name')?.toString() || '',
        username: formData.get('username')?.toString() || '',
        email: formData.get('email')?.toString() || '',
        password: formData.get('password')?.toString() || '',
        confirmPassword: formData.get('confirmPassword')?.toString() || '',
    };

    currentState.full_name = formValue.full_name;
    currentState.username = formValue.username;
    currentState.email = formValue.email;
    currentState.password = formValue.password;
    currentState.confirmPassword = formValue.confirmPassword;

    const validation = signUpSchema.safeParse(formValue);

    if (!validation.success) {
        return {
            ...currentState,
            errors: validation.error.flatten().fieldErrors,
            success: false,
        };
    }
    try {
        const temp = await AuthService.register(formValue);
        if (temp.code >= 200 && temp.code <= 299) {
            return {
                ...currentState,
                errors: {},
                success: true,
            };
        }
    } catch (error: any) {
        console.log(error);
        handleErrorToast(error);
    }
    return { ...currentState, errors: {}, success: false };
};

export const forgetPasswordSubmit = async (currentState: any, formData: FormData) => {
    currentState.email = formData.get('email')?.toString() ?? '';
    const validation = forgetPasswordSchema.safeParse({ email: currentState.email });

    if (!validation.success) {
        return {
            ...currentState,
            errors: validation.error.flatten().fieldErrors,
            success: false,
            data: {},
        };
    }

    try {
        const data = await AuthService.forgetPassword({ email: currentState.email });
        return { ...currentState, errors: {}, success: true, data };
    } catch (error: any) {
        if (error.props.title) {
            const errorMessage = errorKeyMessage[error.props.title as keyof typeof errorKeyMessage] || 'Oops!';
            toast.error(errorMessage);
        }
    }

    return { ...currentState, errors: {}, success: false, data: {} };
};

export const verifyEmail = async (currentState: any, formData: FormData) => {
    const email = currentState.email;
    const code = formData.get('code')?.toString() || '';
    const formValue = { email, code };
    const validation = verifyEmailSchema.safeParse(formValue);
    if (!validation.success) {
        return {
            ...currentState,
            errors: validation.error.flatten().fieldErrors,
            success: false,
        };
    }
    try {
        const temp = await AuthService.verifyEmail(formValue);
        if (temp.code >= 200 && temp.code <= 299) {
            return {
                ...currentState,
                errors: {},
                success: true,
            };
        }
    } catch (error: any) {
        handleErrorToast(error);
    }
    return { ...currentState, errors: {}, success: false };
};

export const resetPassword = async (currentState: any, formData: FormData) => {
    currentState.newPassword = formData.get('newPassword')?.toString() ?? '';
    currentState.confirmPassword = formData.get('confirmPassword')?.toString() ?? '';

    const validation = resetPasswordSchema.safeParse(currentState);
    if (!validation.success) {
        return { ...currentState, errors: validation.error.flatten().fieldErrors, success: false, data: null };
    }

    try {
        const dataResponse = await AuthService.resetPassword({
            email: currentState.email,
            newPassword: currentState.newPassword,
            iv: currentState.iv,
            token: currentState.token,
        });
        return { ...currentState, errors: {}, success: true, data: dataResponse.value };
    } catch (error: any) {
        handleErrorToast(error);
    }

    return { ...currentState, errors: {}, success: false, data: null };
};

export const applyJob = async (currentState: any, formData: FormData, temp: string) => {
    currentState.selectedCv = formData.get('selectedCv')?.toString() ?? '';
    currentState.coverLetter = formData.get('coverLetter')?.toString() ?? '';
    const validation = applyJobCoverLetterSchema.safeParse(currentState);
    if (!validation.success) {
        return { ...currentState, errors: validation.error.flatten().fieldErrors, success: false, data: null };
    }
    try {
        const applyJob = await ApplyJobService.applyJobCoverLetter({
            cvId: currentState.selectedCv,
            coverLetter: currentState.coverLetter,
            jobId: temp,
        });
        return { ...currentState, errors: {}, success: true, data: applyJob };
    } catch (error: any) {
        handleErrorToast(error);
    }

    return { ...currentState, errors: {}, success: false, data: null };
};

export const settingPersonalProfile = async (
    currentState: PersonalProfileType
): Promise<PersonalProfileType & { errors: {}; success: boolean }> => {
    const uploadPromises = [];
    // get avatar file from inputs
    const avatarFile = currentState.avatarFile;
    // because the url include name of file, so if the url not including name means file is different from url => upload to cloud
    if (avatarFile && !currentState.avatarUrl?.includes(avatarFile.name) && avatarFile.size > 0) {
        const uploadAvatar = (async () => await UploadService.uploadFile(avatarFile))();
        uploadPromises.push(uploadAvatar);
    }

    // get background file from inputs
    const backgroundFile = currentState.backgroundFile;
    // because the url include name of file, so if the url not including name means file is different from url => upload to cloud
    if (backgroundFile && !currentState.backgroundUrl?.includes(backgroundFile.name) && backgroundFile.size > 0) {
        const uploadBackground = (async () => await UploadService.uploadFile(backgroundFile))();
        uploadPromises.push(uploadBackground);
    }

    const validation = updatePersonalProfile.safeParse({ fullname: currentState.fullname, phone: currentState.phone });
    if (!validation.success) {
        return {
            ...currentState,
            errors: validation.error.flatten().fieldErrors,
            success: false,
        };
    }

    try {
        const [avatar, background] = await Promise.all(uploadPromises);

        const updatedProfile = await UserService.updatePersonalProfile({
            fullName: currentState.fullname,
            phone: currentState.phone,
            education: currentState.education,
            experience: currentState.experience,
            profileUrl: avatar?.fileUrl || currentState.avatarUrl,
            pageUrl: background?.fileUrl || currentState.backgroundUrl,
        });

        // update current state
        currentState.avatarUrl = updatedProfile?.profileUrl ?? currentState.avatarUrl;
        currentState.backgroundUrl = updatedProfile?.pageUrl ?? currentState.backgroundUrl;
        currentState.fullname = updatedProfile?.fullName ?? currentState.fullname;
        currentState.phone = updatedProfile?.phone ?? currentState.phone;
        currentState.education = updatedProfile?.education ?? currentState.education;
        currentState.experience = updatedProfile?.experience ?? currentState.experience;
        currentState.avatarFile = null;
        currentState.backgroundFile = null;

        return { ...currentState, success: true, errors: {} };
    } catch (error) {
        handleErrorToast(error);
        return { ...currentState, success: false, errors: {} };
    }
};

export const updateCandidateProfile = async (currentState: {
    nationality: string;
    dateOfBirth: string;
    gender: string;
    maritalStatus: string;
    introduction: string;
}) => {
    const validation = updateCandidateProfileZ.safeParse(currentState);

    if (!validation.success) {
        return {
            errors: validation.error.flatten().fieldErrors,
            success: false,
        };
    }

    try {
        await UserService.updateCandidateProfile({
            nationality: currentState.nationality,
            dateOfBirth: currentState.dateOfBirth,
            gender: currentState.gender,
            maritalStatus: currentState.maritalStatus,
            introduction: currentState.introduction,
        });

        return { success: true, errors: {} };
    } catch (error) {
        handleErrorToast(error);
    }
};

const regex = {
    FACEBOOK: /^(https?:\/\/)?(www\.)?(m\.)?(facebook|fb)\.com\/[A-Za-z0-9._-]+(\/)?$/,
    YOUTUBE:
        /^(https?:\/\/)?(www\.)?(youtube\.com\/(@[A-Za-z0-9_-]+|channel\/[A-Za-z0-9_-]+|watch\?v=[A-Za-z0-9_-]+)|youtu\.be\/[A-Za-z0-9_-]+)(\/)?$/,
    INSTAGRAM: /^(https?:\/\/)?(www\.)?(instagram\.com\/[A-Za-z0-9._-]+(\/)?)$/,
    LINKEDIN: /^(https?:\/\/)?(www\.)?(linkedin\.com\/(in|company)\/[A-Za-z0-9_-]+(\/)?)$/,
    TWITTER: /^(https?:\/\/)?(www\.)?(x|twitter)\.com\/[A-Za-z0-9_]+(\/)?$/,
};

export const updateCandidateSocialLinks = async (currentState: {
    links: SocialLink[];
}): Promise<{ success: boolean; errors: (string[] | null)[] }> => {
    let success = true;

    const errors = [];
    const links: SocialLink[] = currentState.links ?? [];
    for (const link of links) {
        if (!link.socialLink) {
            errors.push(['This field is required']);
            success = false;
        } else if (!regex[link.socialType].test(link.socialLink)) {
            errors.push([`This ${link.socialType.toLowerCase()} url is not a valid`]);
            success = false;
        } else {
            errors.push(null);
        }
    }

    if (success) {
        try {
            const linksWithoutId = links.map<Omit<SocialLink, 'websiteId'>>((link) => ({
                socialLink: link.socialLink,
                socialType: link.socialType,
            }));
            await WebsiteService.updateCandidateSocialLinks(linksWithoutId);
        } catch (error) {
            handleErrorToast(error);
        }
    }

    return {
        success,
        errors,
    };
};

export const postJob = async (currentState: any, formData: FormData) => {
    currentState.title = formData.get('title')?.toString() ?? '';
    currentState.tags = formData.getAll('tags[]');
    currentState.minSalary = formData.get('minSalary');
    currentState.maxSalary = formData.get('maxSalary');
    currentState.education = formData.get('education')?.toString() ?? '';
    currentState.experience = Number(formData.get('experience'));
    currentState.jobType = formData.get('jobType')?.toString() ?? '';
    currentState.expirationDate = formData.get('expirationDate')?.toString() ?? '';
    currentState.jobLevel = formData.get('jobLevel')?.toString() ?? '';
    currentState.description = formData.get('description')?.toString() ?? '';
    currentState.responsibilities = formData.get('responsibilities')?.toString() ?? '';
    currentState.category = formData.get('category')?.toString() ?? '';
    currentState.address = formData.get('address')?.toString() ?? '';
    currentState.education = formData.get('education')?.toString() ?? '';
    const validation = postJobSchema.safeParse(currentState);
    if (!validation.success) {
        return { ...currentState, errors: validation.error.flatten().fieldErrors, success: false, data: null };
    }
    try {
        await JobService.postJob({
            name: currentState.title,
            lowestWage: currentState.minSalary,
            highestWage: currentState.maxSalary,
            description: currentState.description,
            responsibility: currentState.responsibilities,
            type: currentState.jobType,
            experience: currentState.experience,
            deadline: currentState.expirationDate,
            introImg: '',
            status: false,
            education: currentState.education,
            tagIds: currentState.tags,
            categoryIds: [currentState.category],
            address: [currentState.address],
        });
        return { ...currentState, errors: {}, success: true };
    } catch (error: any) {
        handleErrorToast(error);
    }

    return { ...currentState, errors: {}, success: false, data: null };
};

export const addTag = async (currentState: any, formData: FormData) => {
    currentState.name = formData.get('name')?.toString() ?? '';
    const validation = addTagSchema.safeParse(currentState);
    if (!validation.success) {
        console.log('Error', validation.error.flatten().fieldErrors);
        return { ...currentState, errors: validation.error.flatten().fieldErrors, success: false, data: null };
    }
    try {
        const colorRandom = getRandomColor();
        const backgroundColorRandom = getBackgroundColor(colorRandom);
        const temp = [
            {
                name: currentState.name,
                color: colorRandom,
                backgroundColor: backgroundColorRandom,
            },
        ];
        await TagService.addTag(temp);
        return { ...currentState, errors: {}, success: true, data: applyJob };
    } catch (error: any) {
        handleErrorToast(error);
    }
    return { ...currentState, errors: {}, success: false, data: null };
};

export const addEnterprises = async (currentState: any, formData: FormData) => {
    const errors: Record<string, any> = {};
    const uploadPromises = [];
    const logoFile = formData.get('logo') as File;
    if (!logoFile || logoFile.size === 0) {
        errors.logo = 'Profile picture is required';
    } else {
        const uploadLogo = (async () => await UploadService.uploadFile(logoFile))();
        uploadPromises.push(uploadLogo);
    }
    currentState.name = formData.get('name')?.toString() ?? '';
    currentState.phone = formData.get('phone')?.toString() ?? '';
    currentState.email = formData.get('email')?.toString() ?? '';
    currentState.vision = formData.get('vision')?.toString() ?? '';
    currentState.size = formData.get('size')?.toString() ?? '';
    currentState.foundedIn = formData.get('foundedIn')?.toString() ?? '';
    currentState.organizationType = formData.get('organizationType')?.toString() ?? '';
    currentState.industryType = formData.get('industryType')?.toString() ?? '';
    currentState.bio = formData.get('bio')?.toString() ?? '';
    currentState.enterpriseBenefits = formData.get('enterpriseBenefits')?.toString() ?? '';
    currentState.description = formData.get('description')?.toString() ?? '';
    const validation = addEnterpriseSchema.safeParse(currentState);
    if (!validation.success) {
        Object.assign(errors, validation.error.flatten().fieldErrors);
    }

    // Nếu có lỗi, trả về tất cả lỗi cùng lúc
    if (Object.keys(errors).length > 0) {
        return {
            ...currentState,
            errors,
            success: false,
            data: {},
        };
    }
    try {
        const [logoFile] = await Promise.all(uploadPromises);
        await EnterpriseService.postEnterprise({
            name: currentState.name,
            email: currentState.email,
            phone: currentState.phone,
            description: currentState.description,
            enterpriseBenefits: currentState.enterpriseBenefits,
            companyVision: currentState.vision,
            logoUrl: logoFile?.fileUrl || currentState.logoUrl,
            foundedIn: currentState.foundedIn,
            organizationType: currentState.organizationType,
            teamSize: currentState.size,
            industryType: currentState.industryType,
            bio: currentState.bio,
            status: 'PENDING',
        });

        return { ...currentState, success: true, errors: {} };
    } catch (error: any) {
        handleErrorToast(error);
    }
    return { ...currentState, errors: {}, success: false, data: null };
};

export const updateRegisterEnterprice = async (currentState: any, formData: FormData) => {
    const errors: Record<string, any> = {};
    const uploadPromises = [];
    const logoFile = formData.get('logo') as File;
    let logoUrl = currentState.logoUrl;
    if (logoFile && logoFile.size > 0) {
        const uploadLogo = (async () => {
            try {
                const uploadedLogo = await UploadService.uploadFile(logoFile);
                logoUrl = uploadedLogo.fileUrl;
            } catch {
                errors.logo = 'Failed to upload profile picture';
            }
        })();
        uploadPromises.push(uploadLogo);
    }
    currentState.name = formData.get('name')?.toString() ?? '';
    currentState.phone = formData.get('phone')?.toString() ?? '';
    currentState.email = formData.get('email')?.toString() ?? '';
    currentState.vision = formData.get('vision')?.toString() ?? '';
    currentState.size = formData.get('size')?.toString() ?? '';
    currentState.foundedIn = formData.get('foundedIn')?.toString() ?? '';
    currentState.organizationType = formData.get('organizationType')?.toString() ?? '';
    currentState.industryType = formData.get('industryType')?.toString() ?? '';
    currentState.bio = formData.get('bio')?.toString() ?? '';
    currentState.enterpriseBenefits = formData.get('enterpriseBenefits')?.toString() ?? '';
    currentState.description = formData.get('description')?.toString() ?? '';

    const validation = addEnterpriseSchema.safeParse(currentState);
    if (!validation.success) {
        Object.assign(errors, validation.error.flatten().fieldErrors);
    }
    if (Object.keys(errors).length > 0) {
        return {
            ...currentState,
            errors,
            success: false,
            data: {},
        };
    }

    try {
        await Promise.all(uploadPromises);
        await EnterpriseService.updateEnterprise(
            {
                name: currentState.name,
                email: currentState.email,
                phone: currentState.phone,
                description: currentState.description,
                enterpriseBenefits: currentState.enterpriseBenefits,
                companyVision: currentState.vision,
                logoUrl: logoUrl,
                foundedIn: currentState.foundedIn,
                organizationType: currentState.organizationType,
                teamSize: currentState.size,
                industryType: currentState.industryType,
                bio: currentState.bio,
                status: 'PENDING',
            },
            currentState.id
        );

        return { ...currentState, success: true, errors: {} };
    } catch (error: any) {
        handleErrorToast(error);
        return {
            ...currentState,
            errors: { general: 'An error occurred while updating the enterprise' },
            success: false,
        };
    }
};
