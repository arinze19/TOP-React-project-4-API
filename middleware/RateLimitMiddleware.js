const { createClient } = require("redis");
const { ErrorHandler } = require('../helpers/ErrorHelpers');

const config = require("../config");

const redis = createClient({
    username: 'default',
    password: config.redis.password,
    socket: {
        host: config.redis.host,
        port: config.redis.port
    }
});

redis.on('error', err => {
    console.log('Redis Client Error', err)

    process.exit(1)
});

await redis.connect();


const RATE_LIMIT_WINDOW = 60;
const MAX_REQUESTS = 10;

class RateLimiter {
    static async limit(req, res, next) {
        const ip = req.ip;
        const key = `rate-limit:${ip}`;

        const current = await redis.incr(key);

        if (current === 1) {
            await redis.expire(key, RATE_LIMIT_WINDOW);
        }

        if (current > MAX_REQUESTS) {
            return next(new ErrorHandler("Too many requests, try again later.", 429));
        }

        next();
    }
}

module.exports = RateLimiter;