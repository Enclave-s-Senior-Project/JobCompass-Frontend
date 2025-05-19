import { memo } from 'react';

export const FilterListEnterprise = memo(() => {
    return (
        <>
            <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-slate-800">Filters</h3>

                <div className="mb-4">
                    <h4 className="mb-2 text-sm font-medium text-slate-700">Enterprise Type</h4>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="featured"
                                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <label htmlFor="featured" className="ml-2 text-sm text-slate-600">
                                Featured
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="verified"
                                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <label htmlFor="verified" className="ml-2 text-sm text-slate-600">
                                Verified
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="topRated"
                                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <label htmlFor="topRated" className="ml-2 text-sm text-slate-600">
                                Top Rated
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <h4 className="mb-2 text-sm font-medium text-slate-700">Location</h4>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="vietnam"
                                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                checked
                            />
                            <label htmlFor="vietnam" className="ml-2 text-sm text-slate-600">
                                Vietnam
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="usa"
                                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <label htmlFor="usa" className="ml-2 text-sm text-slate-600">
                                United States
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="singapore"
                                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <label htmlFor="singapore" className="ml-2 text-sm text-slate-600">
                                Singapore
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="mb-2 text-sm font-medium text-slate-700">Industry</h4>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="tech"
                                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <label htmlFor="tech" className="ml-2 text-sm text-slate-600">
                                Technology
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="finance"
                                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <label htmlFor="finance" className="ml-2 text-sm text-slate-600">
                                Finance
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="healthcare"
                                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <label htmlFor="healthcare" className="ml-2 text-sm text-slate-600">
                                Healthcare
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});
