import rateLimit, { Options as RateLimitOptions } from "express-rate-limit";
import type { RequestHandler } from "express";

export const CustomRateLimiter = (
  TotalRequests: number,
  PerMin: number
): RequestHandler => {
  return rateLimit({
    windowMs: PerMin * 60 * 1000,
    max: TotalRequests,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests, please try again later.",
  } as RateLimitOptions);
};

export const GlobalRateLimiter = (
  TotalRequests: number,
  PerMin: number
): RequestHandler => {
  return rateLimit({
    windowMs: PerMin * 60 * 1000,
    max: TotalRequests,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests, please try again later.",
  } as RateLimitOptions);
};
