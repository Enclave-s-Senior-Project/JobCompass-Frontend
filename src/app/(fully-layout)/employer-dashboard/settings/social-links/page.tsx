import { FormSocialLinks } from '@/components/custom-ui/form-social-links';
import React from 'react';

export default function SocialLinkPageForEmployer() {
    return (
        <div className="min-h-96">
            <FormSocialLinks useType="employer" />
        </div>
    );
}
