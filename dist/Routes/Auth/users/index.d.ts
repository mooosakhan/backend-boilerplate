import type { Request, Response } from "express";
interface SearchUsersRequest extends Request {
    query: Record<string, any>;
}
interface UpdateUsersRequest extends Request {
    query: {
        id?: string;
    };
    body: Record<string, any>;
}
interface DeleteUsersRequest extends Request {
    query: {
        id?: string;
    };
}
export declare const getUsers: (_req: SearchUsersRequest, res: Response) => Promise<void>;
export declare const updateUser: (req: UpdateUsersRequest, res: Response) => Promise<void>;
export declare const deleteUser: (req: DeleteUsersRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=index.d.ts.map