import type { Request, Response } from "express";
interface SignupRequest extends Request {
    body: {
        email: string;
        password: string;
        country?: string;
        city?: string[];
        campus?: string[];
        role?: string;
        permissions?: Record<string, string[]>;
        status?: string;
    };
}
declare const signUpUser: (req: SignupRequest, res: Response) => Promise<void>;
export default signUpUser;
//# sourceMappingURL=index.d.ts.map