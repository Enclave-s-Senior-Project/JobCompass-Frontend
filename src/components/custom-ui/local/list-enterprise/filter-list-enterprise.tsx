import { languagesData } from '@/lib/data/languages.data';
import { memo, useState } from 'react';

export type FilterValuesSidebarEnterprise = {
    enterpriseTypes: string[];
    locations: string[];
    industries: string[];
};

export const defaultFiltersSidebarEnterprise: FilterValuesSidebarEnterprise = {
    enterpriseTypes: [],
    locations: [],
    industries: [],
};

interface Props {
    onApplyFilters: (filters: FilterValuesSidebarEnterprise) => void;
}
const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
export const FilterListEnterprise = memo(({ onApplyFilters }: Props) => {
    const [showAllLocations, setShowAllLocations] = useState(false);
    const [filters, setFilters] = useState<FilterValuesSidebarEnterprise>({
        enterpriseTypes: [],
        locations: [],
        industries: [],
    });
    // Check if filters are active (i.e., differ from default)
    const hasActiveFilters =
        filters.enterpriseTypes.length > 0 || filters.locations.length > 0 || filters.industries.length > 0;

    // Limit to 5 countries initially
    const displayedCountries = showAllLocations ? Object.keys(languagesData) : Object.keys(languagesData).slice(0, 5);

    const handleCheckboxChange = (category: keyof FilterValuesSidebarEnterprise, value: string, checked: boolean) => {
        // Ensure enterpriseTypes are stored in uppercase
        const normalizedValue = category === 'enterpriseTypes' ? value.toUpperCase() : value;
        setFilters((prev) => {
            const updatedValues = checked
                ? [...prev[category], normalizedValue]
                : prev[category].filter((item) => item !== normalizedValue);
            const updatedFilters = { ...prev, [category]: updatedValues };
            onApplyFilters(updatedFilters);
            return updatedFilters;
        });
    };
    const handleClearFilters = () => {
        const resetFilters = { ...defaultFiltersSidebarEnterprise };
        setFilters(resetFilters);
        onApplyFilters(resetFilters);
        setShowAllLocations(false);
    };
    return (
        <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">Filters</h3>
                {hasActiveFilters && (
                    <span
                        className="cursor-pointer text-sm text-red-600 hover:text-red-700"
                        onClick={handleClearFilters}
                    >
                        Clear
                    </span>
                )}
            </div>

            <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium text-slate-700">Organization Type</h4>
                <div className="space-y-2">
                    {['PRIVATE', 'PUBLIC', 'FLAT', 'OUTSOURCE'].map((type) => (
                        <div key={type} className="flex items-center">
                            <input
                                type="checkbox"
                                id={type.toLowerCase()}
                                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                checked={filters.enterpriseTypes.includes(type)}
                                onChange={(e) => handleCheckboxChange('enterpriseTypes', type, e.target.checked)}
                            />
                            <label htmlFor={type.toLowerCase()} className="ml-2 text-sm text-slate-600">
                                {capitalizeFirstLetter(type)}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium text-slate-700">Location</h4>
                <div className="space-y-2">
                    {displayedCountries.map((country) => (
                        <div key={country} className="flex items-center">
                            <input
                                type="checkbox"
                                id={country.toLowerCase().replace(/\s+/g, '-')}
                                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                checked={filters.locations.includes(country)}
                                onChange={(e) => handleCheckboxChange('locations', country, e.target.checked)}
                            />
                            <label
                                htmlFor={country.toLowerCase().replace(/\s+/g, '-')}
                                className="ml-2 text-sm text-slate-600"
                            >
                                {languagesData[country].flag} {country}
                            </label>
                        </div>
                    ))}
                </div>
                {Object.keys(languagesData).length > 5 && (
                    <span
                        className="mt-2 inline-block cursor-pointer text-sm text-teal-600 hover:text-teal-700"
                        onClick={() => setShowAllLocations(!showAllLocations)}
                    >
                        {showAllLocations ? 'Show Less' : 'Show More'}
                    </span>
                )}
            </div>
        </div>
    );
});
FilterListEnterprise.displayName = 'filter-list-enterprise';
