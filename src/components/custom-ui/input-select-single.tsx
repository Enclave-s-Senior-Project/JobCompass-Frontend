import React, { useState, ReactElement } from 'react';
import { Input } from '@/components/ui/input';
import { CheckIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import clsx from 'clsx';

interface InputSelectSingleProps {
    children: ReactElement<InputSelectSingleItemProps>[];
    inputValue: string;
    selectValue: string;
    onChangeInputValue: (value: string) => void;
    onChangeSelectValue: (value: string) => void;
}

interface InputSelectSingleItemProps {
    value: string;
    label: string;
}

// Component for each selectable item
const InputSelectSingleItem = ({ value, label }: InputSelectSingleItemProps) => {
    return <div data-value={value} data-label={label}></div>;
};

// Parent Select Component
const InputSelectSingle = ({
    children,
    inputValue,
    onChangeInputValue,
    onChangeSelectValue,
    selectValue,
}: InputSelectSingleProps) => {
    const [open, setOpen] = useState(false);

    // Extract items from children
    const items = React.Children.toArray(children) as ReactElement<InputSelectSingleItemProps>[];

    const categories = items.map((child) => ({
        value: child.props.value,
        label: child.props.label,
    }));

    const handleSelectItem = ({ label, value: categoryValue }: { value: string; label: string }) => {
        if (categoryValue === selectValue) {
            onChangeSelectValue('');
            onChangeInputValue('');
        } else {
            console.log(categoryValue);
            onChangeSelectValue(categoryValue);
            onChangeInputValue(label);
        }
        setOpen(false);
    };

    const handleBlurInput = () => {
        if (!inputValue) {
            onChangeSelectValue('');
        } else {
            onChangeInputValue(categories.find((c) => c.value === selectValue)?.label || '');
        }
        setOpen(false);
    };

    const filteredCategories = categories.filter((category) =>
        category.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className="relative w-full">
            <Input
                placeholder="Search categories..."
                value={inputValue}
                onChange={(e) => onChangeInputValue(e.target.value)}
                className="h-12 w-full rounded-sm focus-visible:ring-primary-500 focus-visible:border-primary-500"
                onFocus={() => setOpen(true)}
                onBlur={handleBlurInput}
            />
            <Card
                className={clsx(
                    'p-0 absolute w-full z-20 mt-1 rounded-md transition-all',
                    open ? 'visible opacity-100' : 'invisible opacity-0'
                )}
            >
                <CardContent className="py-0 px-1">
                    {filteredCategories.length === 0 ? (
                        <div className="py-6 text-center text-sm text-gray-500">No items found.</div>
                    ) : (
                        <div className="py-1">
                            {filteredCategories.map((category) => (
                                <div
                                    key={category.value}
                                    className="flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-zinc-100 rounded-sm"
                                    onClick={() => handleSelectItem(category)}
                                >
                                    {category.label}
                                    {selectValue === category.value && <CheckIcon className="ml-auto size-4" />}
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export { InputSelectSingle, InputSelectSingleItem };
