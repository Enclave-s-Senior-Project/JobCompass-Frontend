import { Card } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

export default function TermsPage() {
    return (
        <div className="max-w-7xl mx-auto py-12 flex flex-col flex-wrap-reverse md:flex-row gap-8">
            <main className="flex-1">
                <section id="terms" className="mb-16 scroll-mt-16">
                    <h1 className="text-2xl font-bold mb-4">1. Terms & Conditions</h1>
                    <p className="text-gray-700 mb-4">
                        Welcome to JobCompass. By accessing this website, you agree to be bound by these Terms and
                        Conditions, all applicable laws and regulations, and agree that you are responsible for
                        compliance with any applicable local laws. If you do not agree with any of these terms, you are
                        prohibited from using or accessing this site.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>
                            The content of this website is for your general information and use only. It is subject to
                            change without notice.
                        </li>
                        <li>
                            Your use of any information or materials on this website is entirely at your own risk, for
                            which we shall not be liable.
                        </li>
                        <li>This website contains material which is owned by or licensed to us.</li>
                        <li>
                            Unauthorized use of this website may give rise to a claim for damages and/or be a criminal
                            offense.
                        </li>
                        <li>This website may include links to other websites which are not under our control.</li>
                    </ul>
                </section>

                <section id="limitations" className="mb-16 scroll-mt-16">
                    <h2 className="text-2xl font-bold mb-4">2. Limitations</h2>
                    <p className="text-gray-700 mb-4">
                        In no event shall JobCompass or its suppliers be liable for any damages (including, without
                        limitation, damages for loss of data or profit, or due to business interruption) arising out of
                        the use or inability to use the materials on JobCompass&apos;s website, even if JobCompass or a
                        JobCompass authorized representative has been notified orally or in writing of the possibility
                        of such damage.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>
                            Some jurisdictions do not allow limitations on implied warranties or limitations of
                            liability, so these limitations may not apply to you.
                        </li>
                        <li>The materials on JobCompass&apos;s website are provided on an &apos;as is&apos; basis.</li>
                        <li>
                            JobCompass makes no warranties, expressed or implied, and hereby disclaims all other
                            warranties.
                        </li>
                        <li>
                            JobCompass does not warrant that the functions contained in the materials will be
                            uninterrupted or error-free.
                        </li>
                        <li>
                            JobCompass does not warrant that defects will be corrected or that this site or the server
                            is free of viruses.
                        </li>
                    </ul>
                </section>

                <section id="security" className="mb-16 scroll-mt-16">
                    <h2 className="text-2xl font-bold mb-4">3. Security</h2>
                    <p className="text-gray-700 mb-4">
                        We take reasonable precautions to maintain the security of your information. However, we cannot
                        guarantee the security of information you provide or that it will not be accessed, disclosed,
                        altered, or destroyed. To the fullest extent permitted by law, we disclaim all liability and
                        responsibility for any damages you may suffer due to any loss, unauthorized access, misuse or
                        alteration of any information you submit to this website.
                    </p>
                </section>

                <section id="privacy" className="mb-16 scroll-mt-16">
                    <h2 className="text-2xl font-bold mb-4">4. Privacy Policy</h2>
                    <p className="text-gray-700 mb-4">
                        Your privacy is important to us. It is JobCompass&apos;s policy to respect your privacy
                        regarding any information we may collect from you across our website. We only ask for personal
                        information when we truly need it to provide a service to you. We collect it by fair and lawful
                        means, with your knowledge and consent.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>
                            We store personal information for only as long as we need it to provide you with our
                            services.
                        </li>
                        <li>
                            We protect stored data within commercially acceptable means to prevent loss and theft, as
                            well as unauthorized access, disclosure, copying, use, or modification.
                        </li>
                        <li>
                            We don&apos;t share any personally identifying information publicly or with third-parties,
                            except when required by law.
                        </li>
                        <li>
                            Our website may link to external sites that are not operated by us. We have no control over
                            their content and practices.
                        </li>
                        <li>
                            You are free to refuse our request for your personal information, with the understanding
                            that we may be unable to provide you with some desired services.
                        </li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                        Your continued use of our website will be regarded as acceptance of our practices around privacy
                        and personal information. If you have any questions about how we handle user data and personal
                        information, feel free to contact us at
                        <a
                            className="text-primary-500 font-semibold hover:underline"
                            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_CONTACT}`}
                        >
                            {process.env.NEXT_PUBLIC_EMAIL_CONTACT}.
                        </a>
                    </p>
                </section>
            </main>

            <aside className="md:w-64 shrink-0">
                <Card className="sticky top-8 p-6 rounded-md">
                    <h3 className="text-xs uppercase text-gray-500 font-semibold mb-4">TABLE OF CONTENTS</h3>
                    <nav className="space-y-2">
                        <Link
                            href="#terms"
                            className="block text-sm text-primary-600 hover:font-semibold hover:text-primary-700 transition-all"
                        >
                            1. Terms & Conditions
                        </Link>
                        <Link
                            href="#limitations"
                            className="block text-sm text-primary-600 hover:font-semibold hover:text-primary-700 transition-all"
                        >
                            2. Limitations
                        </Link>
                        <Link
                            href="#security"
                            className="block text-sm text-primary-600 hover:font-semibold hover:text-primary-700 transition-all"
                        >
                            3. Security
                        </Link>
                        <Link
                            href="#privacy"
                            className="block text-sm text-primary-600 hover:font-semibold hover:text-primary-700 transition-all"
                        >
                            4. Privacy Policy
                        </Link>
                    </nav>
                </Card>
            </aside>
        </div>
    );
}
