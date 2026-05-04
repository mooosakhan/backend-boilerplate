import type { Request, Response, NextFunction } from "express";
import type { IUser } from "../../Helpers/types.js";
export declare const tokenVerification: (req: Request, res: Response, next: NextFunction) => void;
interface SocketWithAuth {
    handshake: {
        auth?: {
            token?: string;
        };
    };
    user?: IUser;
}
export declare const socketTokenVerification: (socket: SocketWithAuth, next: (error?: Error) => void) => Promise<void>;
export {};
//# sourceMappingURL=index.d.ts.map