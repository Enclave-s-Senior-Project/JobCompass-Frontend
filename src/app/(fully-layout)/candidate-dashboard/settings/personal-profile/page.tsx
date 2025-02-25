import { FormPersonalProfile } from '@/components/custom-ui/form-personal-profile';
import React from 'react';

export default function PersonalProfilePage() {
    return (
        <div className="space-y-4">
            <h5 className="text-lg font-medium text-gray-900">Basic Information</h5>
            <FormPersonalProfile />
        </div>
    );
}
