'use client';
import KanbanBoard from '@/components/applications/kanban-board';
import { useParams } from 'next/navigation';
export default function Home() {
    const { id } = useParams();
    return (
        <main className="container mx-auto p-4">
            <div className="flex items-center text-sm text-muted-foreground mb-4">
                <a href="#" className="hover:text-primary">
                    Home
                </a>
                <span className="mx-2">/</span>
                <a href="#" className="hover:text-primary">
                    Job
                </a>
                <span className="mx-2">/</span>
                <a href="#" className="hover:text-primary">
                    Senior UI/UX Designer
                </a>
                <span className="mx-2">/</span>
                <span className="text-foreground">Applications</span>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Job Applications</h1>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-muted rounded-md">Filter</button>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">Sort</button>
                </div>
            </div>

            <KanbanBoard jobId={id} />
        </main>
    );
}
