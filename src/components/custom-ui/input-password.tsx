import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import * as React from "react";

interface InputPasswordProps {
    hide: boolean;
    setHide: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps & React.ComponentProps<"input">>(
    ({ className, hide, setHide, ...props }, ref) => {
        const handleTogglePasswordVisibility = () => {
            setHide(!hide);
        };

        return (
            <div
                className={cn(
                    `relative flex h-9 w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors 
                    file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground 
                    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
                    className
                )}>
                <Input
                    {...props}
                    ref={ref}
                    type={hide ? "password" : "text"}
                    className="shadow-none pr-8 h-full rounded-sm border-none"
                />
                <BsEye
                    className={clsx("absolute top-1/2 right-1 -translate-y-1/2 size-[22px]", hide ? "hidden" : "")}
                    onClick={handleTogglePasswordVisibility}
                />
                <BsEyeSlash
                    className={clsx("absolute top-1/2 right-1 -translate-y-1/2 size-[22px]", !hide ? "hidden" : "")}
                    onClick={handleTogglePasswordVisibility}
                />
            </div>
        );
    }
);
