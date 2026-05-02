const rateLimit = require("express-rate-limit");

const CustomRateLimiter = (TotalRequests, PerMin) => {
  return rateLimit({
    windowMs: PerMin * 60 * 1000,
    max: TotalRequests,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Too many requests, please try again later.",
  });
};

const GlobalRateLimiter = (TotalRequests, PerMin) => {
  return rateLimit({
    windowMs: PerMin * 60 * 1000,
    max: TotalRequests,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Too many requests, please try again later.",
  });
};

module.exports = {
  CustomRateLimiter,
  GlobalRateLimiter,
};
