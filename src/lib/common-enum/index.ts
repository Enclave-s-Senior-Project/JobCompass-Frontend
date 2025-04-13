export enum JobTypeEnum {
    FULL_TIME = 'Full Time',
    PART_TIME = 'Part Time',
    CONTRACT = 'Contract',
    TEMPORARY = 'Temporary',
    INTERNSHIP = 'Internship',
    REMOTE = 'Remote',
    FREELANCE = 'Freelance',
    SEASONAL = 'Seasonal',
    VOLUNTEER = 'Volunteer',
    APPRENTICESHIP = 'Apprenticeship',
}

export enum ApplyJobStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    DENIED = 'DENIED',
}

export enum JobStatusEnum {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    EXPIRED = 'EXPIRED',
}

export enum NotificationType {
    JOB_EXPIRED = 'job_expired',
    JOB_APPLIED = 'job_applied',
    APPLICATION_ACCEPTED = 'application_accepted',
    APPLICATION_REJECTED = 'application_rejected',
    // ADD MORE WHEN NEEDED
}

export enum MessagePayment {
    SUCCESSFUL_PAYMENT = 'success',
    UNSUCCESSFUL_PAYMENT = 'Unsuccessful',
}
