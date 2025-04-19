import { PopularVacancies } from '@/components/home-page/popular-vacancies';
import { HowItWorks } from '@/components/home-page/how-it-works';
import { TopCompanies } from '@/components/home-page/top-companies';
import { PopularCategory } from '@/components/home-page/popular-categories';
import { HeroSection } from '@/components/home-page/hero-section';
import { FeatureJobs } from '@/components/home-page/feature-jobs';
import { Testimonials } from '@/components/home-page/testimonials';
import { CTASection } from '@/components/home-page/cta-section';

export default function Home() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gray-50 py-16 md:py-24">
                <HeroSection />
            </div>

            {/* vacancies session */}
            <div className="py-16 md:py-24">
                <PopularVacancies />
            </div>

            {/* How it works */}
            <div className="bg-gray-50 py-16 md:py-24">
                <HowItWorks />
            </div>

            {/* Popular Categories */}
            <div className="py-16 md:py-24">
                <PopularCategory />
            </div>

            {/* Featured Jobs */}
            <div className="bg-gray-50 py-16 md:py-24">
                <FeatureJobs />
            </div>
            <div className="py-16 md:py-24">
                <TopCompanies />
            </div>
            {/* Testimonials */}
            <div className="bg-gray-50 py-16 md:py-24">
                <Testimonials />
            </div>

            {/* CTAs */}
            <div className="py-16 md:py-24">
                <CTASection />
            </div>
        </main>
    );
}
