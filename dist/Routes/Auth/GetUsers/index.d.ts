import type { Request, Response } from "express";
interface GetUsersRequest extends Request {
    query: {
        search?: string;
    };
}
declare const getUsers: (_req: GetUsersRequest, res: Response) => Promise<void>;
export default getUsers;
//# sourceMappingURL=index.d.ts.map