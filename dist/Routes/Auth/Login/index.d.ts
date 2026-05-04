import type { Request, Response } from "express";
interface LoginRequest extends Request {
    body: {
        email: string;
        password: string;
    };
}
declare const login: (req: LoginRequest, res: Response) => Promise<void>;
export default login;
//# sourceMappingURL=index.d.ts.map