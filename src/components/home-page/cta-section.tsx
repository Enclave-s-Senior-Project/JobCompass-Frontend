import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LuArrowRight } from 'react-icons/lu';

export function CTASection() {
    return (
        <section>
            <div className="container mx-auto max-w-screen-xl px-4">
                <div className="grid gap-8 md:grid-cols-2">
                    <Card className="bg-gray-100 p-12">
                        <h3 className="mb-4 text-3xl font-medium">Become a Candidate</h3>
                        <p className="mb-6 text-muted-foreground">
                            Create your profile and let employers find you. Apply to jobs with just one click.
                        </p>
                        <Button variant="third" size="xl" className="group transition-all">
                            Register Now{' '}
                            <LuArrowRight className="transition-all duration-100 group-hover:translate-x-2" />
                        </Button>
                    </Card>
                    <Card className="bg-primary p-12 text-primary-foreground">
                        <h3 className="mb-4 text-3xl font-medium">Become an Employer</h3>
                        <p className="mb-6 text-primary-foreground/80">
                            Post jobs and find the perfect candidate. Streamline your hiring process.
                        </p>
                        <Button variant="third" size="xl" className="group transition-all">
                            Register Now{' '}
                            <LuArrowRight className="transition-all duration-100 group-hover:translate-x-2" />
                        </Button>
                    </Card>
                </div>
            </div>
        </section>
    );
}
