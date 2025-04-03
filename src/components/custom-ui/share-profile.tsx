import React from 'react';
import { Button } from '../ui/button';
import { FaFacebookF, FaLinkedin, FaPinterest, FaXTwitter } from 'react-icons/fa6';

export default function ShareProfile() {
    return (
        <div className="flex items-center flex-wrap gap-5">
            <p>Share profile:</p>
            <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="lg" className="[&_svg]:size-[18px] text-blue-600 hover:text-blue-600">
                    <FaFacebookF /> Facebook
                </Button>
                <Button variant="outline" size="lg" className="[&_svg]:size-[18px] text-black hover:text-black">
                    <FaXTwitter /> X (Twitter)
                </Button>
                <Button variant="outline" size="lg" className="[&_svg]:size-[18px] text-blue-600 hover:text-blue-600">
                    <FaLinkedin /> LinkedIn
                </Button>
            </div>
        </div>
    );
}
