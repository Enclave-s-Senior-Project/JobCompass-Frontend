import { ButtonHome } from '@/components/custom-ui/button-home';
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-dvh flex-col">
            <div className="flex items-center justify-center pb-24 pt-10">
                <ButtonHome />
            </div>
            <div className="flex-1">{children}</div>
        </div>
    );
}
