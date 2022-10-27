const rateLimiter = require('express-rate-limit')

const loginLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 50 requests per window per 15 minutes
  standardHeaders: true, // Return the rate limit info in the `RateLimit-* headers
  legacyHeaaders: false // Disable the `X-RateLimit-*` headers
})

const genericLimiter = rateLimiter({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 50, // 50 requests per window
  standardHeaders: true,
  legacyHeaaders: false
})

module.exports = {
  loginLimiter,
  genericLimiter
}
