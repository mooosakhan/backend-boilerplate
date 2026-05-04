import type { ValidationError } from "joi";
interface ValidationHelpers {
    message: (msg: string) => ValidationError;
}
export declare const objectIdValidator: (value: string, helpers: ValidationHelpers) => string;
export interface IValidationResult {
    error: ValidationError | undefined;
    value: any;
}
export {};
//# sourceMappingURL=index.d.ts.map