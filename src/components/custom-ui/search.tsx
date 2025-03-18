'use client';

import React, { useEffect, useId, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { languagesData } from '@/lib/data/languages.data';
import { InputSelectSingle, InputSelectSingleItem } from './input-select-single';

export function Search() {
    const [select, setSelect] = useState<{ inputValue: string; selectValue: string }>({
        inputValue: '🇻🇳 Vietnam',
        selectValue: 'Vietnam',
    });

    const [countries, setCountries] = useState<any[]>(Object.entries(languagesData));

    const inputId = useId();

    useEffect(() => {
        const filteredCountries = Object.entries(languagesData).filter((language) => {
            const splitted = select.inputValue.split(' ');
            let text = splitted.length > 1 ? splitted[1] : splitted[0];
            return language[0].toLowerCase().startsWith(text.toLowerCase());
        });

        setCountries(filteredCountries);
    }, [select.inputValue]);

    return (
        <div className="h-12 w-full lg:max-w-[668px] lg:w-[668px] flex items-center border border-input rounded-sm focus-within:border-primary-200">
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
                    <InputSelectSingleItem
                        key={language[0]}
                        value={language[0]}
                        label={`${language[1].flag} ${language[0]}`}
                    />
                ))}
            </InputSelectSingle>

            <Separator orientation="vertical" className="h-3/5" />
            <label htmlFor={inputId} className="p-2">
                <HiMiniMagnifyingGlass className="size-6 text-primary" />
            </label>
            <Input
                id={inputId}
                className="flex-1 h-full border-none shadow-none focus-visible:ring-0 text-base font-normal"
                placeholder="Job title, keyword, company"
            />
        </div>
    );
}
