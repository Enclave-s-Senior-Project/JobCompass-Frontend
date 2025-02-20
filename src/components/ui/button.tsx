import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { ImSpinner2 } from 'react-icons/im';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                primary:
                    'bg-primary border-primary text-primary-foreground shadow hover:bg-primary-600 hover:border-primary-600',
                secondary:
                    'bg-primary-50 border-primary-50 text-primary shadow hover:bg-primary-100 hover:border-primary-100 ',
                third: 'bg-primary-50 border-primary-50 text-primary shadow hover:bg-primary hover:border-primary hover:text-primary-foreground',
                'outline-secondary':
                    'border-primary-100 bg-white text-primary shadow hover:bg-primary hover:border-primary hover:text-primary-foreground',
                    ghost: 'border-transparent bg-white text-gray-600 hover:bg-gray-100/80 hover:text-gray-900 shadow',
                outline: 'border-primary-100 bg-white text-primary shadow hover:border-primary',
            },
            size: {
                md: 'border py-1 px-2 sm:py-2 sm:px-4 rounded-sm text-xs [&_svg]:size-4 md:[&_svg]:size-5',
                lg: 'border py-2 px-4 md:py-3 md:px-6 rounded-sm text-sm md:text-base [&_svg]:size-5 md:[&_svg]:size-6',
                xl: 'border-2 py-3 px-6 lg:py-4 lg:px-8 rounded-sm text-base [&_svg]:size-6 md:[&_svg]:size-d',
                'icon-md': 'border p-1 md:p-2 rounded-sm text-sm md:text-base [&_svg]:size-4 md:[&_svg]:size-5',
                'icon-lg': 'border p-2 md:p-3 rounded-sm text-sm md:text-base [&_svg]:size-5 md:[&_svg]:size-6',
                'icon-xl': 'border p-3 md:p-6 rounded-sm text-sm md:text-base [&_svg]:size-6 md:[&_svg]:size-d',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'lg',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps & { isPending?: boolean }>(
    ({ className, variant, size, isPending = false, children, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
                disabled={isPending}
            >
                {isPending && <ImSpinner2 className="animate-spin" />} {children}
            </Comp>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
