const rateLimiter = require('express-rate-limit')

const loginLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 20 requests per window per 15 minutes
  standardHeaders: true, // Return the rate limit info in the `RateLimit-* headers
  legacyHeaaders: false // Disable the `X-RateLimit-*` headers
})

module.exports = {
  loginLimiter
}
