import { FormCompanyProfile } from '@/components/custom-ui/form-company-profile';
import React from 'react';

export default function PersonalProfilePage() {
    return (
        <div className="space-y-4">
            <h5 className="text-lg font-medium text-gray-900">Logo & Banner Image</h5>
            <FormCompanyProfile />
        </div>
    );
}
