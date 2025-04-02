import { AxiosError } from 'axios';
import { AddressService } from './address.service';
import { ApplyJobService } from './apply-job.service';
import { AuthService } from './auth.service';
import { BoostJobService } from './boost-job.service';
import { CategoryService } from './categories.service';
import { CVService } from './cv.service';
import { JobService } from './job.service';
import { TagService } from './tag.service';
import { UploadService } from './upload.service';
import { UserService } from './user.service';
import { WebsiteService } from './website.service';
import Error from 'next/error';

const handleErrorApi = (err: any) => {
    if (err instanceof AxiosError) {
        throw new Error({
            statusCode: Number(err.status || err.response?.status),
            title: err.response?.data.message,
        });
    }
    throw err;
};

export {
    handleErrorApi,
    AddressService,
    ApplyJobService,
    AuthService,
    BoostJobService,
    CVService,
    CategoryService,
    JobService,
    TagService,
    UploadService,
    UserService,
    WebsiteService,
};
