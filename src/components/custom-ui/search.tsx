'use client';

import React, { useEffect, useId, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { languagesData } from '@/lib/data/languages.data';
import { InputSelectSingle, InputSelectSingleItem } from './input-select-single';
import { useRouter } from 'next/navigation';

export function Search() {
    const [select, setSelect] = useState<{ inputValue: string; selectValue: string }>({
        inputValue: 'Vietnam',
        selectValue: 'Vietnam',
    });
    const [inputValue, setInputValue] = useState('');

    const [countries, setCountries] = useState<any[]>(Object.entries(languagesData));

    const router = useRouter();

    const inputId = useId();

    useEffect(() => {
        const filteredCountries = Object.entries(languagesData).filter((language) => {
            const splitted = select.inputValue.split(' ');
            const text = splitted.length > 1 ? splitted[1] : splitted[0];
            return language[0].toLowerCase().startsWith(text.toLowerCase());
        });

        setCountries(filteredCountries);
    }, [select.inputValue]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/find-jobs?country=' + select.selectValue + '&search=' + inputValue);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex h-12 w-full items-center rounded-sm border border-input focus-within:border-primary-200 lg:w-[668px] lg:max-w-[668px]"
        >
            <InputSelectSingle
                className="max-w-40 border-none ring-0 focus-within:border-none focus-within:ring-0"
                placeholder="Country"
                inputValue={select.inputValue}
                onChangeInputValue={(value: string) => {
                    setSelect((prev) => ({ ...prev, inputValue: value }));
                }}
                selectValue={select.selectValue}
                onChangeSelectValue={(value: string) => {
                    setSelect((prev) => ({ ...prev, selectValue: value }));
                }}
            >
                {countries.map((language) => (
                    <InputSelectSingleItem key={language[0]} value={language[0]} label={language[0]} />
                ))}
            </InputSelectSingle>

            <Separator orientation="vertical" className="h-3/5" />
            <label htmlFor={inputId} className="p-2">
                <HiMiniMagnifyingGlass className="size-6 text-primary" />
            </label>
            <Input
                id={inputId}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="h-full flex-1 border-none text-base font-normal shadow-none focus-visible:ring-0"
                placeholder="Job title, keyword, company"
            />
            <button type="submit" className="hidden"></button>
        </form>
    );
}
