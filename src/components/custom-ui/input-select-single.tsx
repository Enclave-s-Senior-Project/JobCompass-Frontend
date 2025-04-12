import React, { useState, ReactElement, memo, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { CheckIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import clsx from 'clsx';
import { cn } from '@/lib/utils';

interface InputSelectSingleProps {
    disabled?: boolean;
    children: any;
    inputValue: string;
    selectValue: string;
    placeholder?: string;
    className?: string;
    onChangeInputValue: (value: string) => void;
    onChangeSelectValue: (value: string) => void;
}

interface InputSelectSingleItemProps {
    value: string;
    label: string;
    className?: string;
}

// Component for each selectable item
const InputSelectSingleItem = memo(({ value, label, className }: InputSelectSingleItemProps) => {
    return <div data-value={value} data-label={label} data-class={className}></div>;
});

// Parent Select Component
const InputSelectSingle = memo(
    ({
        children,
        inputValue,
        onChangeInputValue,
        onChangeSelectValue,
        selectValue,
        placeholder,
        className,
        disabled,
    }: InputSelectSingleProps) => {
        const [open, setOpen] = useState(false);
        const [isBlur, setIsBlur] = useState(false);

        const wrapperRef = useRef<HTMLDivElement>(null);

        const items = React.Children.toArray(children) as ReactElement<InputSelectSingleItemProps>[];

        const categories = items.map((child) => ({
            value: child.props.value,
            label: child.props.label,
            className: child.props.className,
        }));

        const handleSelectItem = ({ label: categoryLabel, value: categoryValue }: { value: string; label: string }) => {
            if (categoryValue === selectValue) {
                onChangeSelectValue('');
                onChangeInputValue('');
            } else {
                onChangeSelectValue(categoryValue);
                onChangeInputValue(categoryLabel);
            }
            setOpen(false);
        };

        const handleBlurInput = () => {
            if (!inputValue) {
                onChangeSelectValue('');
            } else {
                const c = categories.find((c) => c.value === selectValue)?.label || '';
                if (c !== inputValue) {
                    onChangeInputValue(c);
                }
            }
            setOpen(false);
        };

        const handleWrapperBlur = (e: React.FocusEvent<HTMLDivElement>) => {
            // Check if blur is happening inside the wrapper (e.g., clicking the dropdown)
            if (wrapperRef.current?.contains(e.relatedTarget)) return;

            setIsBlur(true);
            setOpen(false);
        };

        useEffect(() => {
            if (isBlur) handleBlurInput();
        }, [isBlur]);

        return (
            <div
                ref={wrapperRef}
                aria-disabled={disabled}
                tabIndex={0} // Makes the div focusable
                onBlur={handleWrapperBlur}
                className={cn(
                    'h-12 relative rounded-sm border border-input shadow-sm transition-all',
                    className,
                    disabled
                        ? 'cursor-not-allowed border-gray-50'
                        : 'focus-within:ring-1 focus-within:ring-primary-500 focus-within:border-primary-500 '
                )}
            >
                <Input
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => {
                        onChangeInputValue(e.target.value);
                        setIsBlur(false);
                    }}
                    className="h-12 w-full rounded-sm shadow-none ring-0 border-0 transition-none focus-visible:border-0 focus-visible:ring-0"
                    onFocus={() => {
                        setOpen(true);
                        setIsBlur(false);
                    }}
                    disabled={disabled}
                />
                <Card
                    className={clsx(
                        'p-0 max-h-96 overflow-y-auto absolute -left-0.5 -right-0.5 z-40 mt-1 rounded-md transition-all',
                        open ? 'visible opacity-100' : 'invisible opacity-0'
                    )}
                >
                    <CardContent className="py-1 px-1">
                        {categories.length === 0 ? (
                            <div className="py-6 text-center text-sm text-gray-500">No items found.</div>
                        ) : (
                            categories.map((category) => (
                                <div
                                    key={category.value}
                                    className={cn(
                                        'flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-zinc-100 rounded-sm',
                                        category.className
                                    )}
                                    onClick={() => handleSelectItem(category)}
                                >
                                    {category.label}
                                    {selectValue === category.value && <CheckIcon className="ml-auto size-4" />}
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>
        );
    }
);

InputSelectSingle.displayName = 'InputSelectSingle';
InputSelectSingleItem.displayName = 'InputSelectSingleItem';

export { InputSelectSingle, InputSelectSingleItem };
