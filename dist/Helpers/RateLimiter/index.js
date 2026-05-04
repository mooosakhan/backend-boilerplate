import rateLimit from "express-rate-limit";
export const CustomRateLimiter = (TotalRequests, PerMin) => {
    return rateLimit({
        windowMs: PerMin * 60 * 1000,
        max: TotalRequests,
        standardHeaders: true,
        legacyHeaders: false,
        message: "Too many requests, please try again later.",
    });
};
export const GlobalRateLimiter = (TotalRequests, PerMin) => {
    return rateLimit({
        windowMs: PerMin * 60 * 1000,
        max: TotalRequests,
        standardHeaders: true,
        legacyHeaders: false,
        message: "Too many requests, please try again later.",
    });
};
//# sourceMappingURL=index.js.map