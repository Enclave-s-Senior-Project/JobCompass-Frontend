const errorKeyMessage = {
    AUTH_REGISTER_EMAIL_EXISTS: 'Email already registered.',
    NOT_FOUND_USER_EXCEPTION: 'User not found.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    USERNAME_TOO_SHORT: 'Username too short.',
    EMAIL_NOT_EXIST: 'Email not found.',
    AUTH_VERIFY_CODE_INVALID: 'Invalid code.',
    INTERNAL_ERROR_SERVER: 'Server error.',
    FILL_INDUSTRY_BEFORE_MAJORITY: 'Set industry first.',
    MAJORITY_MUST_BE_CHILD_OF_INDUSTRY: 'Majority must match industry.',
    USER_NOT_FOUND: 'User not found.',
    CODE_INVALID: 'Invalid code.',
    NOT_ALLOW: 'Token expired or invalid.',
    EMAIL_ALREADY_EXISTS: 'Email already used.',
    ALREADY_APPLIED: 'Already applied.',
    USER_NOT_ACTIVE: 'Account inactive or unverified.',
    EMAIL_NOT_EXISTS: 'Email not found.',
    EMAIL_REQUIRED: 'Email is required.',
    EMAIL_INVALID: 'Invalid email format.',
    PASSWORD_WEAK: 'Password too weak.',
    PASSWORD_TOO_LONG: 'Password too long.',
    PASSWORD_TOO_SHORT: 'Password too short.',
    PASSWORD_MUST_BE_STRING: 'Password must be a string.',
    PASSWORD_REQUIRED: 'Password is required.',
    TOKEN_MUST_BE_STRING: 'Token must be a string.',
    TOKEN_REQUIRED: 'Token is required.',
    IV_MUST_BE_STRING: 'IV must be a string.',
    IV_REQUIRED: 'IV is required.',
    TOKEN_EXPIRED: 'Token expired.',
    NOT_ALLOW_RESET_PW: 'Password reset not allowed.',
    CV_IN_USE: 'CV in use.',
    JOB_ADDED_WISHLIST: 'This job was added.',
    INVALID_ID: 'Invalid id',
    NOT_ALLOWED_UPDATE_APPLICATION_STATUS: 'Not allowed to update application status.',
};

const warningKeyMessage = {
    NOT_ALLOWED_UPDATE_APPLICATION_APPROVED_OR_DENIED:
        'Not allowed to update applications that are already approved or denied.',
};

const successKeyMessage = {
    FORGET_PASSWORD: 'Check email to reset password.',
    RESET_PASSWORD: 'Password reset successful.',
    APPLY_JOB_SUCCESSFUL: 'Job application successful.',
    POST_JOB_SUCCESSFUL: 'Job submission successful.',
    REGISTER_ENTERPRISE_SUCCESSFUL: 'Enterprise registration successful.',
    UPDATE_REGISTER_ENTERPRISE_SUCCESSFUL: 'Enterprise update successful.',
    SUCCESSFUL_PAYMENT: 'Successful Payment',
    UNSUCCESSFUL_PAYMENT: 'Unsuccessful Payment',
};

export { errorKeyMessage, successKeyMessage, warningKeyMessage };
