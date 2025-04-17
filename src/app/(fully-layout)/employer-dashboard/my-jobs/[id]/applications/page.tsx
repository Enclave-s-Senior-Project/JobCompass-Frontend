'use client';
import KanbanBoard from '@/components/applications/kanban-board';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
export default function Home() {
    const { id } = useParams();
    return (
        <main className="container mx-auto w-full">
            <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Link href="/" className="hover:text-primary">
                    Home
                </Link>
                <span className="mx-2">/</span>
                <Link href="/employer-dashboard/my-jobs" className="hover:text-primary">
                    My Jobs
                </Link>
                <span className="mx-2">/</span>
                <span className="text-foreground">Applications</span>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Job Applications</h1>
                <div className="flex gap-2">
                    <Button variant="outline" size="md">
                        Filter
                    </Button>
                    <Button size="md">Sort</Button>
                </div>
            </div>

            <KanbanBoard jobId={id} />
        </main>
    );
}
