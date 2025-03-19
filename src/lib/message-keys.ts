const errorKeyMessage = {
    AUTH_REGISTER_EMAIL_EXISTS: 'This email is already registered.',
    NOT_FOUND_USER_EXCEPTION: 'User not found.',
    INVALID_CREDENTIALS: 'Password or email went wrong.',
    USERNAME_TOO_SHORT: 'Username is too short.',
    EMAIL_NOT_EXIST: 'Email not registered. Try again!',
    AUTH_VERIFY_CODE_INVALID: 'Invalid code.',
    INTERNAL_ERROR_SERVER: 'Internal server error.',
    FILL_INDUSTRY_BEFORE_MAJORITY: 'Fill industry before majority.',
    MAJORITY_MUST_BE_CHILD_OF_INDUSTRY: 'Majority must be included in the industry.',
    USER_NOT_FOUND: 'User not found.',
    CODE_INVALID: 'Invalid code.',
    NOT_ALLOW: 'Token is expired or invalid.',
    EMAIL_ALREADY_EXISTS: 'This email was already used',
};

const successKeyMessage = {
    FORGET_PASSWORD: 'Check your email to reset your password.',
    RESET_PASSWORD: 'Your password has been reset.',
    APPLY_JOB_SUCCESSFULL: ' Apply job successfully',
    POST_JOB_SUCCESSFULL: ' Submit job successfully',
    REGISTER_ENTERPRISE_SUCCESSFULL: 'Register enterprise successfull',
    UPDATE_REGISTER_ENTERPRISE_SUCCESSFULL: ' Update enterprise successfull',
};

export { errorKeyMessage, successKeyMessage };
