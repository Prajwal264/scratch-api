import { createMethodDecorator } from 'type-graphql';
import { verifyAccessToken } from './token.helper';
import { Context } from 'src/types/common.types';
// TODO: add an @authenticated/@private dectorator that checks if the user is eligible to make the request
/**
 *
 *
 * @return {*} 
 */
export const Authorized = () => {
  return createMethodDecorator(async ({ context }: {context: Context}, next) => {
    const req = context.req;
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) throw new Error('Not Authorized');
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) throw new Error('Not Authorized');
    try {
      verifyAccessToken(accessToken);
    } catch (e) {
      throw new Error(e)
    }
    return next();
  });
}
