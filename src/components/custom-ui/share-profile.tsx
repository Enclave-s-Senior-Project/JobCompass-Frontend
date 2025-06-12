import React from 'react';
import { Button } from '../ui/button';
import { FaFacebookF, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

export default function ShareProfile() {
    return (
        <div className="flex flex-wrap items-center gap-5">
            <p>Share profile:</p>
            <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="lg" className="text-blue-600 hover:text-blue-600 [&_svg]:size-[18px]">
                    <FaFacebookF /> Facebook
                </Button>
                <Button variant="outline" size="lg" className="text-black hover:text-black [&_svg]:size-[18px]">
                    <FaXTwitter /> X (Twitter)
                </Button>
                <Button variant="outline" size="lg" className="text-blue-600 hover:text-blue-600 [&_svg]:size-[18px]">
                    <FaLinkedin /> LinkedIn
                </Button>
            </div>
        </div>
    );
}
