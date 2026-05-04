import type { Request, Response } from "express";
interface DeleteUserRequest extends Request {
    query: {
        id?: string;
    };
}
declare const deleteUser: (req: DeleteUserRequest, res: Response) => Promise<void>;
export default deleteUser;
//# sourceMappingURL=index.d.ts.map