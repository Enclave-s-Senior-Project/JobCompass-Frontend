export interface Application {
    id: string;
    name: string;
    position: string;
    yearsExperience: number;
    education: string;
    appliedDate: string;
    avatarUrl: string;
}

export interface Column {
    id: string;
    title: string;
    applicationIds: string[];
}

export interface AppData {
    applications: {
        [key: string]: Application;
    };
    columns: {
        [key: string]: Column;
    };
    columnOrder: string[];
}
