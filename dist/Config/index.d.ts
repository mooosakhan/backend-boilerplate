interface Config {
    HOST: string;
    PORT: number;
    dbName: string;
    dbPassword: string;
    ADMIN_SECRET: string | undefined;
    STUDENT_SECRET: string | undefined;
    JWT_SECRET: string | undefined;
    AWS_LAMBDA_SECRET: string | undefined;
}
declare const config: Config;
export default config;
//# sourceMappingURL=index.d.ts.map