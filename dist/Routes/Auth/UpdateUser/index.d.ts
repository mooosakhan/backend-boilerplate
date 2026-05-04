import type { Request, Response } from "express";
interface UpdateUserRequest extends Request {
    query: {
        id?: string;
    };
    body: {
        password?: string;
        [key: string]: any;
    };
}
declare const updateUser: (req: UpdateUserRequest, res: Response) => Promise<void>;
export default updateUser;
//# sourceMappingURL=index.d.ts.map