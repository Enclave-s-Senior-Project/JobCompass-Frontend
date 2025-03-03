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
    user: User,
    resource: Resource,
    action: Permissions[Resource]['action'],
    data?: Permissions[Resource]['dataType']
) {
    return user.roles?.some((role) => {
        const permission = (ROLES as RolesWithPermissions)[role][resource]?.[action];
        if (permission == null) return false;

        if (typeof permission === 'boolean') return permission;
        return data != null && permission(user, data);
    });
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
