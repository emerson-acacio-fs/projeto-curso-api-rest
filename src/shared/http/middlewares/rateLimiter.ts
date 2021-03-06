import { cacheConfig } from 'config/cache';
import { NextFunction, Request, Response } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { AppError } from 'shared/errors/AppError';

const redisClient = new Redis(cacheConfig.config.redis);

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rate-limiter',
  points: 5,
  duration: 1,
  blockDuration: 10,
});

export async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (error) {
    throw new AppError('Too many requests', 429);
  }
}
