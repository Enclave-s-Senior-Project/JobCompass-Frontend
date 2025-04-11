import { z } from 'zod';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const signUpSchema = z
    .object({
        full_name: z
            .string()
            .min(1, 'Full name is required')
            .regex(/^[A-Z][a-zA-Z'’-]+(?: [A-Z][a-zA-Z'’-]+)*$/, 'Full name is invalid'),
        username: z
            .string()
            .min(1, 'Username is required')
            .min(4, 'Username must be at least 4 characters')
            .max(20, 'Username must be at most 20 characters'),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z
            .string()
            .min(1, 'Password is required')
            .max(32, 'Password must be at most 32 characters')
            .regex(
                passwordRegex,
                'Password must be at least 8 characters with uppercase, number, and special character'
            ),
        confirmPassword: z.string().min(1, 'Confirm password is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Confirm password does not match',
        path: ['confirmPassword'],
    });

const verifyEmailSchema = z.object({
    code: z.string().min(6, 'Code is min 6 characters'),
});

const verifySignInSchema = z.object({
    username: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'New password is required')
        .max(32, 'Password must be at most 32 characters')
        .regex(passwordRegex, 'Password must be at least 8 characters with uppercase, number, and special character'),
});

const forgetPasswordSchema = z.object({
    email: z.string().trim().min(1, 'Email is required').email('Invalid email'),
});

const resetPasswordSchema = z
    .object({
        newPassword: z
            .string()
            .min(1, 'New password is required')
            .max(32, 'Password must be at most 32 characters')
            .regex(
                passwordRegex,
                'Password must be at least 8 characters with uppercase, number, and special character'
            ),
        confirmPassword: z.string().min(1, 'Confirm password is required'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Confirm password does not match',
        path: ['confirmPassword'],
    });

const applyJobCoverLetterSchema = z.object({
    selectedCv: z
        .string({
            required_error: 'CV is required',
        })
        .min(1, 'CV is required'),
    coverLetter: z.string().min(1, 'Cover letter is required'),
});
const updatePersonalProfile = z.object({
    fullname: z.string().min(1, 'Full name is required'),
    phone: z
        .string()
        .regex(/^\+?[0-9]{7,15}$/, 'Phone is invalid')
        .optional(),
    maritalStatus: z.enum(['ALONE', 'MARRIED'], { message: 'Marital status is invalid' }).nullable().optional(),
    dateOfBirth: z
        .string()
        .refine((date) => new Date(date).getTime() <= Date.now(), { message: 'Your birthday cannot be in the future' })
        .refine(
            (date) => {
                const birthDate = new Date(date);
                const today = new Date();

                if (isNaN(birthDate.getTime())) return false; // Invalid date check

                const age =
                    today.getFullYear() -
                    birthDate.getFullYear() -
                    (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);
                return age >= 18;
            },
            { message: 'You must be at least 18 years old' }
        )
        .nullable()
        .optional(),
});

const updateCandidateProfile = z.object({
    nationality: z.string().min(1, 'Nationality is required'),
    gender: z.enum(['FEMALE', 'MALE'], { message: 'Gender is required' }),
});

const postJobSchema = z
    .object({
        title: z
            .string()
            .min(1, 'Job name is required')
            .max(255, 'Job name must be at most 255 characters')
            .refine((value) => /^[A-Z]/.test(value), {
                message: 'Job name must start with an uppercase letter',
            }),
        minSalary: z
            .string({
                required_error: 'Minimum salary is required',
            })
            .nonempty('Minimum salary cannot be empty')
            .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
                message: 'Minimum salary must be a positive number',
            }),

        maxSalary: z
            .string({
                required_error: 'Maximum salary is required',
            })
            .nonempty('Maximum salary cannot be empty')
            .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
                message: 'Maximum salary must be a positive number',
            }),
        description: z.string().min(20, 'Description is required and must be at least 20 characters'),
        responsibilities: z.string().min(20, 'Responsibility is required and must be at least 20 characters'),
        type: z.string().max(50).optional(),
        experience: z.coerce.number().min(1, 'Experience must be a positive number'),
        deadline: z
            .string()
            .optional()
            .refine((date) => !date || !isNaN(Date.parse(date)), {
                message: 'Invalid date format',
            }),
        tags: z.array(z.string()).min(1, 'At least one tag is required'),
        education: z
            .string({
                required_error: 'Education is required',
            })
            .min(1, 'Education is required'),
        jobType: z.string({ required_error: 'Job type is required' }).min(1, 'Job type is required'),
        expirationDate: z
            .string({
                required_error: 'Expiration date is required',
            })
            .nonempty('Expiration date cannot be empty'),
        category: z
            .string({
                required_error: 'Category is required',
            })
            .min(1, 'Category is required'),
        benefit: z.string().min(20, 'Benefit is required and must be at least 20 characters'),
        specializations: z.array(z.string()).min(1, 'At least one specializations is required'),
        requirements: z.string().min(20, 'Requirements is required and must be at least 20 characters'),
    })
    .refine((data) => Number(data.minSalary) <= Number(data.maxSalary), {
        message: 'Minimum salary must be less than or equal to maximum salary',
        path: ['minSalary'],
    });

const addTagSchema = z.object({
    name: z
        .string()
        .min(1, 'Tag name is required')
        .max(10, 'Tag name must be at most 10 characters long')
        .refine((value) => /^[A-Z]/.test(value), {
            message: 'Tag name must start with an uppercase letter',
        }),
});

const addEnterpriseSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required')
        .max(255, 'Name must be between 1 and 255 characters')
        .refine((value) => /^[A-Z][a-zA-Z0-9\s]*$/.test(value), {
            message: 'Name must start with an uppercase letter and contain only letters, numbers, and spaces',
        }),
    email: z
        .string()
        .min(1, 'Email is required')
        .max(255, 'Email must be at most 255 characters')
        .email('Email format is invalid')
        .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|biz|info|io|vn|us|uk|fr|de|ca|au|jp|kr)$/,
            'Email format is invalid'
        ),

    phone: z.string().regex(/^\+?\d{7,15}$/, 'Phone must be a valid phone number'),
    description: z.string().min(20, 'Description is required and must be at least 20 characters'),
    vision: z.string().min(1, 'vision is required '),
    organizationType: z.string().min(1, 'Organization type is required'),
    size: z.string().min(1, 'Size is required'),
    industryType: z
        .string()
        .min(1, 'Industry is require')
        .max(255, 'Industry type must be at most 255 characters')
        .optional(),
    bio: z.string().min(1, 'Bio is required').max(255, 'Bio must be at most 255 characters'),

    enterpriseBenefits: z.string().min(20, 'Benefit is required and must be at least 20 characters'),
    foundedIn: z
        .string({
            required_error: 'Founded in date is required',
        })
        .nonempty('Founded in date cannot be empty')
        .refine(
            (data) => {
                const founded = new Date(data);
                const today = new Date();
                return founded <= today;
            },
            {
                message: 'Founded in date cannot be in the future',
            }
        ),
});

const companyProfileSchema = z.object({
    logoUrl: z.string().optional(),
    backgroundImageUrl: z.string().optional(),
    logoFile: z.instanceof(File).optional().nullable(),
    backgroundFile: z.instanceof(File).optional().nullable(),
    name: z
        .string()
        .min(3, 'Company name must be at least 3 characters')
        .max(100, 'Company name is too long')
        .optional(),
    phone: z.string().min(1, 'Phone is required').max(20, 'Phone is too long').optional(),
    description: z
        .string()
        .min(10, 'Description must be at least 10 characters')
        .max(1000, 'Description is too long')
        .optional(),
});

export type CompanyProfileForm = z.infer<typeof companyProfileSchema>;

// Define Zod Schema
const companyProfileFoundingSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    phone: z.string().min(1, 'Phone is required'),
    description: z.string().min(1, 'Description is required'),
    companyVision: z.string().min(1, 'Vision is required'), // Fixed naming to match form
    organizationType: z.string().min(1, 'Organization type is required'),
    teamSize: z.string().min(1, 'Size is required'), // Fixed naming to match form
    industryType: z.string().min(1, 'Industry type is required'),
    bio: z.string().min(1, 'Bio is required'),
    enterpriseBenefits: z.string().min(1, 'Enterprise benefits is required'),
    foundedIn: z.string().min(1, 'Founded in is required'),
});

export type CompanyProfileFoundingForm = z.infer<typeof companyProfileFoundingSchema>;

const uploadCVSchema = z.object({
    cvName: z.string().min(8, 'Resume name is at least 8 characters').max(20, 'Resume name is at most 20 characters'),
    cvFile: z.instanceof(File, { message: 'Resume file is required' }).refine(
        (file) => {
            // Check file size (12MB limit)
            if (file.size / (1024 * 1024) >= 12) {
                return false;
            }
            // Check if file is PDF
            if (file.type !== 'application/pdf') {
                return false;
            }
            return true;
        },
        { message: 'File must be a PDF and less than 12MB' }
    ),
});

const updateCVSchema = z.object({
    cvName: z.string().min(8, 'Resume name is at least 8 characters').max(20, 'Resume name is at most 20 characters'),
});

export {
    companyProfileFoundingSchema,
    companyProfileSchema,
    signUpSchema,
    verifySignInSchema,
    verifyEmailSchema,
    forgetPasswordSchema,
    resetPasswordSchema,
    applyJobCoverLetterSchema,
    updatePersonalProfile,
    updateCandidateProfile,
    postJobSchema,
    addTagSchema,
    addEnterpriseSchema,
    uploadCVSchema,
    updateCVSchema,
};
