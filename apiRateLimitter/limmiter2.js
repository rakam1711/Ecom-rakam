const rateLimit = require('express-rate-limit');
const limiter2 = rateLimit({
    windowMs: 3 * 1000, // 3 seconds
    max: 1, // Limit each user to 1 request per windowMs
    message: 'Too many requests from this IP, please try again after a while.'
});

module.exports = limiter2