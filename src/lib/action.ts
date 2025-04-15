import { Address, CandidateProfileType, DetailedRequest, PersonalProfileType, SocialLink } from '@/types';
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
    uploadCVSchema,
    updateCVSchema,
    addressSchema,
} from './zod-schemas';
import { handleErrorToast } from './utils';
import { ApplyJobService } from '@/services/apply-job.service';
import { AuthService } from '@/services/auth.service';
import { UploadService } from '@/services/upload.service';
import { UserService } from '@/services/user.service';
import { WebsiteService } from '@/services/website.service';
import { getBackgroundColor, getRandomColor } from './random-color';
import { TagService } from '@/services/tag.service';
import { JobService } from '@/services/job.service';
import { EnterpriseService } from '@/services/enterprises.service';
import { setLoginCookie, storeTokenInfo } from './auth';
import { CVService } from '@/services/cv.service';
export const signInSubmit = async (currentState: DetailedRequest.SignInRequest, formData: FormData) => {
    const username = formData.get('username')?.toString() ?? '';
    const password = formData.get('password')?.toString() ?? '';
    const data = { username, password };
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
        if (res.value) {
            storeTokenInfo(res.value?.accessToken as string, res.value?.tokenType, res.value?.accessTokenExpires);
            setLoginCookie(res.value?.refreshTokenExpires);
        }
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
        handleErrorToast(error);
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
    } else {
        uploadPromises.push((() => {})());
    }

    // get background file from inputs
    const backgroundFile = currentState.backgroundFile;
    // because the url include name of file, so if the url not including name means file is different from url => upload to cloud
    if (backgroundFile && !currentState.backgroundUrl?.includes(backgroundFile.name) && backgroundFile.size > 0) {
        const uploadBackground = (async () => await UploadService.uploadFile(backgroundFile))();
        uploadPromises.push(uploadBackground);
    } else {
        uploadPromises.push((() => {})());
    }

    const validation = updatePersonalProfile.safeParse({
        fullname: currentState.fullName,
        phone: currentState.phone,
        maritalStatus: currentState.maritalStatus || null,
        dateOfBirth: currentState.dateOfBirth || null,
    });
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
            fullName: currentState.fullName,
            phone: currentState.phone,
            education: currentState.education,
            experience: currentState.experience,
            profileUrl: avatar?.fileUrl ?? currentState.avatarUrl,
            pageUrl: background?.fileUrl || currentState.backgroundUrl,
            dateOfBirth: currentState.dateOfBirth,
            maritalStatus: currentState.maritalStatus,
        });

        // update current state
        currentState.avatarUrl = updatedProfile?.profileUrl ?? currentState.avatarUrl;
        currentState.backgroundUrl = updatedProfile?.pageUrl ?? currentState.backgroundUrl;
        currentState.fullName = updatedProfile?.fullName ?? currentState.fullName;
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
export const settingEmployerProfile = async (formData: FormData) => {
    // Upload promises storage
    const uploadPromises: Promise<any>[] = [];

    let logoUrl = formData.get('logoUrl')?.toString() || '';
    let backgroundImageUrl = formData.get('backgroundImageUrl')?.toString() || '';

    const logoFile = formData.get('logoFile') as File;
    if (logoFile && logoFile.size > 0) {
        uploadPromises.push(
            UploadService.uploadFile(logoFile).then((res) => {
                logoUrl = res.fileUrl || ''; // Update logoUrl after successful upload
            })
        );
    }

    const backgroundFile = formData.get('backgroundFile') as File;
    if (backgroundFile && backgroundFile.size > 0) {
        uploadPromises.push(
            UploadService.uploadFile(backgroundFile).then((res) => {
                backgroundImageUrl = res.fileUrl || ''; // Update backgroundImageUrl after successful upload
            })
        );
    }

    try {
        // Wait for all uploads to complete
        await Promise.all(uploadPromises);

        // Now update company profile with the correct URLs
        await EnterpriseService.updateEnterpriseCompany({
            logoUrl,
            backgroundImageUrl,
            name: formData.get('name')?.toString() || '',
            description: formData.get('description')?.toString() || '',
            phone: formData.get('phone')?.toString() || '',
        });
    } catch (error) {
        handleErrorToast(error);
        return { ...formData, success: false, errors: {} };
    }
};

export const updateCandidateProfile = async (
    currentState: CandidateProfileType
): Promise<CandidateProfileType & { errors: {}; success: boolean }> => {
    const validation = updateCandidateProfileZ.safeParse(currentState);

    if (!validation.success) {
        return {
            ...currentState,
            errors: validation.error.flatten().fieldErrors,
            success: false,
        };
    }

    try {
        const updatedProfile = await UserService.updateCandidateProfile({
            nationality: currentState.nationality || null,
            gender: currentState.gender || null,
            introduction: currentState.introduction || '',
            industryId: currentState.industryId || null,
            majorityId: currentState.majorityId || null,
        });

        currentState.nationality = updatedProfile?.nationality ?? '';
        currentState.gender = updatedProfile?.gender ?? '';
        currentState.introduction = updatedProfile?.introduction ?? '';

        return { ...currentState, success: true, errors: {} };
    } catch (error) {
        handleErrorToast(error);
        return { ...currentState, success: false, errors: {} };
    }
};

const regex = {
    FACEBOOK: /^(https?:\/\/)?(www\.)?(facebook\.com)\/(profile\.php\?id=\d{6,}|[\w\.]{5,})$/,
    YOUTUBE:
        /^(https?:\/\/)?(?:www\.)?youtube\.com\/(?:@[\w-]{1,30}|channel\/[a-zA-Z0-9!@#$%^&*(),.?":{}|<>_-]{22,24})$/,
    INSTAGRAM: /^(https?:\/\/)?(?:www\.)?instagram\.com\/[a-zA-Z0-9_\.]{1,30}$/,
    LINKEDIN:
        /^(https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/(in\/[a-zA-Z0-9!@#$%^&*(),.?":{}|<>\-]{3,100}|company\/[a-zA-Z0-9!@#$%^&*(),.?":{}|<>\-]{3,100}|school\/[a-zA-Z0-9!@#$%^&*(),.?":{}|<>\-]{3,100})(\/)?$/,
    TWITTER: /^(https?:\/\/)?(?:www\.|mobile\.)?twitter\.com\/[a-zA-Z0-9!@#$%^&*(),.?":{}|<>_]{1,15}$/,
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
    currentState.description = formData.get('description')?.toString() ?? '';
    currentState.responsibilities = formData.get('responsibilities')?.toString() ?? '';
    currentState.category = formData.get('category')?.toString() ?? '';
    currentState.address = formData.get('address')?.toString() ?? '';
    currentState.education = formData.get('education')?.toString() ?? '';
    currentState.benefit = formData.get('benefit')?.toString() ?? '';
    currentState.specializations = formData.getAll('specializations[]');
    currentState.requirements = formData.get('requirements')?.toString() ?? '';
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
            enterpriseBenefits: currentState.benefit,
            specializationIds: currentState.specializations,
            requirements: currentState.requirements,
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
    const logoFile =
        (formData.get('logo') as File).size === 0 && currentState.logo
            ? (currentState.logo as File)
            : (formData.get('logo') as File);
    if (!logoFile || logoFile.size === 0) {
        errors.logo = 'Logo is required';
    } else {
        const uploadLogo = (async () => await UploadService.uploadFile(logoFile))();
        uploadPromises.push(uploadLogo);
        currentState.logo = logoFile;
    }
    currentState.logo = logoFile;
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
            backgroundImageUrl: currentState.backgroundImageUrl,
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
                backgroundImageUrl: currentState.backgroundImageUrl,
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

export const settingEmployerFounding = async (formData: FormData) => {
    try {
        await EnterpriseService.updateEnterpriseCompanyFounding({
            organizationType: formData.get('organizationType')?.toString() || '',
            industryType: formData.get('industryType')?.toString() || '',
            teamSize: formData.get('teamSize')?.toString() || '',
            foundedIn: formData.get('foundedIn') ? new Date(formData.get('foundedIn') as string) : new Date(),
            email: formData.get('email')?.toString() || '',
            bio: formData.get('bio')?.toString() || '',
            companyVision: formData.get('companyVision')?.toString() || '',
            description: formData.get('description')?.toString() || '',
        });
    } catch (error) {
        handleErrorToast(error);
        return { ...formData, success: false, errors: {} };
    }
};

export const updateEnterpriseSocialLinks = async (currentState: {
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
            await WebsiteService.updateEmployerSocialLinks(linksWithoutId);
        } catch (error) {
            handleErrorToast(error);
        }
    }

    return {
        success,
        errors,
    };
};

export const uploadCV = async (currentState: any) => {
    const validation = uploadCVSchema.safeParse(currentState);
    if (!validation.success) {
        return {
            ...currentState,
            errors: validation.error.flatten().fieldErrors,
            success: false,
        };
    }

    const { success, fileUrl } = await UploadService.presignedCV(currentState?.cvFile);
    if (!success || !fileUrl) {
        return {
            ...currentState,
            errors: { cvFile: 'Failed to upload CV' },
            success: false,
        };
    }

    await CVService.uploadCV({
        cvName: currentState?.cvName,
        cvUrl: fileUrl,
        isPublished: currentState?.isPublished,
        size: (currentState?.cvFile as File).size / (1024 * 1024),
    });

    return { ...currentState, success: true };
};

export const updateCV = async (currentState: any) => {
    const validation = updateCVSchema.safeParse(currentState);
    if (!validation.success) {
        return {
            ...currentState,
            errors: validation.error.flatten().fieldErrors,
            success: false,
        };
    }

    await CVService.updateCV({
        cvId: currentState?.cvId,
        cvName: currentState?.cvName,
        isPublished: currentState?.isPublished,
    });

    return { ...currentState, success: true };
};

export const updateJob = async (currentState: any, formData: FormData) => {
    currentState.title = formData.get('title')?.toString() ?? '';
    currentState.tags = formData.getAll('tags[]');
    currentState.minSalary = formData.get('minSalary');
    currentState.maxSalary = formData.get('maxSalary');
    currentState.education = formData.get('education')?.toString() ?? '';
    currentState.experience = Number(formData.get('experience'));
    currentState.jobType = formData.get('jobType')?.toString() ?? '';
    currentState.expirationDate = formData.get('expirationDate')?.toString() ?? '';
    currentState.description = formData.get('description')?.toString() ?? '';
    currentState.responsibilities = formData.get('responsibilities')?.toString() ?? '';
    currentState.category = formData.get('category')?.toString() ?? '';
    currentState.address = formData.get('address')?.toString() ?? '';
    currentState.education = formData.get('education')?.toString() ?? '';
    currentState.benefit = formData.get('benefit')?.toString() ?? '';
    currentState.specializations = formData.getAll('specializations[]');
    currentState.jobId = formData.get('jobId')?.toString() ?? '';
    currentState.requirements = formData.get('requirements')?.toString() ?? '';
    const validation = postJobSchema.safeParse(currentState);
    if (!validation.success) {
        return { ...currentState, errors: validation.error.flatten().fieldErrors, success: false, data: null };
    }
    try {
        await JobService.updateJob(currentState.jobId, {
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
            enterpriseBenefits: currentState.benefit,
            specializationIds: currentState.specializations,
            requirements: currentState.requirements,
        });
        return { ...currentState, errors: {}, success: true };
    } catch (error: any) {
        handleErrorToast(error);
    }

    return { ...currentState, errors: {}, success: false, data: null };
};

export const settingAddressEmployer = async (formData: Address) => {
    const validation = addressSchema.safeParse(formData);
    if (!validation.success) {
        return {
            errors: validation.error.flatten().fieldErrors,
            success: false,
            data: null, // Return null for data when validation fails
        };
    }

    try {
        const data = await EnterpriseService.updateAddressEmployer(formData);
        return {
            errors: null,
            success: true,
            data,
        };
    } catch (error: any) {
        handleErrorToast(error);
        return {
            errors: ['An error occurred while updating the address.'],
            success: false,
            data: null,
        };
    }
};
