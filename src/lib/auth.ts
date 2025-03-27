import { Job, Role, User } from '@/types';

type PermissionCheck<Key extends keyof Permissions> =
    | boolean
    | ((user: User, data: Permissions[Key]['dataType']) => boolean);

type RolesWithPermissions = {
    [R in Role]: Partial<{
        [Key in keyof Permissions]: Partial<{
            [Action in Permissions[Key]['action']]: PermissionCheck<Key>;
        }>;
    }>;
};

type Permissions = {
    job: {
        dataType: Job;
        action: 'view' | 'create' | 'update' | 'delete';
    };
    enterpriseDashboard: {
        dataType: null;
        action: 'access';
    };
    markCandidates: {
        dataType: null;
        action: 'allowed';
    };
    hireCandidate: {
        dataType: null;
        action: 'hire';
    };
};

const ROLES = {
    ADMIN: {
        job: {
            create: false,
            update: false,
            delete: true,
            view: true,
        },
    },
    ENTERPRISE: {
        job: {
            create: true,
            update: true,
            delete: true,
            view: true,
        },
        enterpriseDashboard: {
            access: true,
        },
        markCandidates: {
            allowed: true,
        },
        hireCandidate: {
            hire: true,
        },
    },
    USER: {
        job: {
            create: false,
            update: false,
            delete: false,
            view: true,
        },
    },
} as const satisfies RolesWithPermissions;

export function hasPermission<Resource extends keyof Permissions>(
    user: User | null,
    resource: Resource,
    action: Permissions[Resource]['action'],
    data?: Permissions[Resource]['dataType']
) {
    return (
        user &&
        user.roles?.some((role) => {
            const permission = (ROLES as RolesWithPermissions)[role][resource]?.[action];
            if (permission == null) return false;

            if (typeof permission === 'boolean') return permission;
            return data != null && permission(user, data);
        })
    );
}

export function getStoredTokenInfo() {
    return {
        isLogged: JSON.parse(localStorage.getItem('logged') || 'false'),
        accessToken: JSON.parse(localStorage.getItem('access_token') || ''),
        accessType: JSON.parse(localStorage.getItem('access_type') || 'Bearer'),
        tokenExpires: parseInt(JSON.parse(localStorage.getItem('access_expires') || '0')),
    };
}

export function storeTokenInfo(accessToken: string, accessType: string, expires: number) {
    localStorage.setItem('logged', JSON.stringify(true));
    localStorage.setItem('access_token', JSON.stringify(accessToken));
    localStorage.setItem('access_type', JSON.stringify(accessType));
    localStorage.setItem('access_expires', JSON.stringify(Date.now() + expires));
}

export function clearTokenInfo() {
    localStorage.removeItem('logged');
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_type');
    localStorage.removeItem('access_expires');
}

export function clearUserAndEnterpriseInfoLocalStorage() {
    localStorage.removeItem('user');
    localStorage.removeItem('enterprise');
}

export function setLoginCookie() {
    document.cookie = 'login=true; path=/';
}

export function clearLoginCookie() {
    document.cookie = 'login=false; path=/';
}

// USAGE:
//   const user: User = { blockedBy: ["2"], id: "1", roles: ["USER"] }
//   const todo: Todo = {
//     completed: false,
//     id: "3",
//     invitedUsers: [],
//     title: "Test Todo",
//     userId: "1",
//   }

//   // Can create a comment
//   hasPermission(user, "comments", "create")

//   // Can view the `todo` Todo
//   hasPermission(user, "todos", "view", todo)

//   // Can view all todos
//   hasPermission(user, "todos", "view")
