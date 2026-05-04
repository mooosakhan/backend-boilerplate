export declare const MESSAGES: {
    readonly INVALID_CREDENTIALS: "Invalid email or password.";
    readonly INVALID_PASSWORD: "Invalid password.";
    readonly TOKEN_REQUIRED: "Authentication token is required";
    readonly INVALID_TOKEN: "Invalid authentication token";
    readonly INTERNAL_SERVER_ERROR: "Internal server error";
    readonly UNAUTHORIZED: "Unauthorized: You do not have permission to access this resource.";
    readonly NOT_FOUND: "Resource not found";
    readonly SUCCESS: "Operation completed successfully";
};
export declare const MONTH_LIST: readonly ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export declare const ROLES: {
    readonly ADMIN: "admin";
    readonly USER: "user";
};
export type RoleType = typeof ROLES[keyof typeof ROLES];
//# sourceMappingURL=index.d.ts.map