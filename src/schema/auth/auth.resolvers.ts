import { not } from 'graphql-shield';
import jwt from 'jsonwebtoken';
import { isAuthenticated } from '../../util/permissionHelpers';
import { ResolverContext } from '../resolvers';

interface AuthInput {
  username: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

export const permissions = {
  Mutation: {
    authenticate: not(isAuthenticated),
  },
};

export interface AuthUser {
  id: string;
  tenantId: string;
  username: string;
}

const users: AuthUser[] = [
  {
    id: '1',
    tenantId: '1',
    username: 'user1@tenant1.org',
  },
  {
    id: '2',
    tenantId: '1',
    username: 'user2@tenant1.org',
  },
  {
    id: '1',
    tenantId: '2',
    username: 'user1@tenant2.org',
  },
  {
    id: '2',
    tenantId: '2',
    username: 'user2@tenant2.org',
  },
];

const Mutation = {
  authenticate: async (
    _: null,
    { auth }: { auth: AuthInput },
    context: ResolverContext
  ): Promise<AuthResponse> => {
    const { username, password } = auth;
    const user = users.find((user) => user.username === username);
    if (!user) {
      throw new Error('Unauthorized');
    }

    return {
      token: jwt.sign(user, process.env.JWT_SECRET!),
    };
  },
};

export default { Mutation };
