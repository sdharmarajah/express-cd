import jwt from 'jsonwebtoken';
import moment, { Moment } from 'moment';
import config from '../config/config';

import { Token } from '@prisma/client';
import prisma from '../client';
import { AuthTokensResponse } from '../types/response';

/**
 * Generate token
 * @param {number} userId
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (
  userId: number,
  expires: Moment,
  secret = config.jwt.secret
): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix()
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {number} userId
 * @param {Moment} expires
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (
  token: string,
  userId: number,
  expires: Moment,
  blacklisted = false
): Promise<Token> => {
  const createdToken = prisma.token.create({
    data: {
      token,
      userId,
      expires: expires.toDate(),
      blacklisted
    }
  });
  return createdToken;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @returns {Promise<Token>}
 */
const verifyToken = async (token: string): Promise<Token> => {
  const payload = jwt.verify(token, config.jwt.secret);
  const userId = Number(payload.sub);
  const tokenData = await prisma.token.findFirst({
    where: { token, userId, blacklisted: false }
  });
  if (!tokenData) {
    throw new Error('Token not found');
  }
  return tokenData;
};

/**
 * Generate auth token (only access token)
 * @param {User} user
 * @returns {Promise<AuthTokensResponse>}
 */
const generateAuthToken = async (user: { id: number }): Promise<AuthTokensResponse> => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires);

  await saveToken(accessToken, user.id, accessTokenExpires);

  return {
    token: accessToken
  };
};

export default {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthToken
};
