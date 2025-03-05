import { z } from 'zod';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const signUpSchema = z
    .object({
        full_name: z.string().min(1, 'Full name is required'),
        username: z
            .string()
            .min(4, 'Username must be at least 4 characters')
            .max(20, 'Username must be at most 20 characters.'),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z
            .string()
            .min(1, 'New password is required')
            .max(32, 'Password must be at most 32 characters')
            .regex(
                passwordRegex,
                'Password must be at least 8 characters with uppercase, number, and special character'
            ),
        confirmPassword: z.string().min(8, 'Confirm Password is required'),
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
    coverLetter: z.string().min(1, 'Cover letter is required'),
});

const updatePersonalProfile = z.object({
    fullname: z.string().min(1, 'Full name is required'),
    phone: z.string().regex(/^\+?[0-9]{7,15}$/, 'Phone is invalid'),
});

const updateCandidateProfile = z.object({
    nationality: z.string().min(1, 'Nationality is required'),
    dateOfBirth: z.string().refine(
        (date) => {
            const today = new Date();
            const birthDate = new Date(date);

            // Calculate age
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            const dayDiff = today.getDate() - birthDate.getDate();

            // Adjust age if birthday hasn't occurred this year
            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                age--;
            }

            return age >= 18;
        },
        {
            message: 'You must be at least 18 years old',
        }
    ),
    gender: z.enum(['FEMALE', 'MALE'], { message: 'Gender is required' }),
    maritalStatus: z.enum(['ALONE', 'MARRIED'], { message: 'Marital status is required' }),
    introduction: z.string().min(1, 'Introduction is required'),
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
        jobLevel: z
            .string({
                required_error: 'Job level is required',
            })
            .min(1, 'Job level is required'),
        category: z
            .string({
                required_error: 'Category is required',
            })
            .min(1, 'Category is required'),
        address: z
            .string({
                required_error: 'Address is required',
            })
            .min(1, 'Address is required'),
    })
    .refine((data) => Number(data.minSalary) <= Number(data.maxSalary), {
        message: 'Minimum salary must be less than or equal to maximum salary',
        path: ['minSalary'],
    });

const addTagSchema = z.object({
    name: z
        .string()
        .min(1, 'required')
        .refine((value) => /^[A-Z]/.test(value), {
            message: 'Tag name must start with an uppercase letter',
        }),
});

const addEnterpriseSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required.')
        .max(255, 'Name must be between 1 and 255 characters.')
        .refine((value) => /^[A-Z][a-zA-Z0-9\s]*$/.test(value), {
            message: 'Name must start with an uppercase letter and contain only letters, numbers, and spaces.',
        }),
    email: z
        .string()
        .min(1, 'Email is required.')
        .max(255, 'Email must be at most 255 characters.')
        .email('Email format is invalid.')
        .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|biz|info|io|vn|us|uk|fr|de|ca|au|jp|kr)$/,
            'Email format is invalid.'
        ),

    phone: z.string().regex(/^\+?\d{7,15}$/, 'Phone must be a valid phone number.'),
    description: z.string().min(20, 'Description is required and must be at least 20 characters'),
    vision: z.string().min(1, 'vision is required '),
    organizationType: z.string().min(1, 'Organization type is required'),
    size: z
        .string()
        .min(1, 'Team size is required.')
        .refine((value) => /^\d+$/.test(value), {
            message: 'Team size must contain only numbers.',
        }),
    industryType: z
        .string()
        .min(1, 'Industry is require')
        .max(255, 'Industry type must be at most 255 characters.')
        .optional(),
    bio: z
        .string()
        .min(1, 'Bio is required.')
        .max(255, 'Bio must be at most 255 characters.')
        .regex(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/, 'Bio must be a valid URL.'),

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
    description: z
        .string()
        .min(10, 'Description must be at least 10 characters')
        .max(1000, 'Description is too long')
        .optional(),
});

export type CompanyProfileForm = z.infer<typeof companyProfileSchema>;

export {
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
};
