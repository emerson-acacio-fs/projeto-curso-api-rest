import { authConfig } from 'config/auth';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from 'shared/errors/AppError';

type DecodeToken = {
  iat: number;
  sub: string;
  exp: number;
};

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('JWT Token is missing');
  }
  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, authConfig.jwt.secret) as DecodeToken;

    request.user = { id: decodeToken.sub };

    next();
  } catch (err) {
    throw new AppError('Invalid JWT Token');
  }
}

export function isFileAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const token = request.query.token as string;
  if (!token) {
    throw new AppError('JWT Token is missing');
  }

  try {
    const decodeToken = verify(token, authConfig.jwt.secret) as DecodeToken;

    request.user = { id: decodeToken.sub };

    next();
  } catch (err) {
    throw new AppError('Invalid JWT Token');
  }
}
