import { GraphQLString } from 'graphql';
import { UserType } from '../schemas/user';

const user = [{ id: '1', firstName: 'James', lastName: 'Brown' }];

const userQuery = {
  type: UserType,
  args: { id: { type: GraphQLString } },
  resolve: (parent, args) => {
    return user[0];
  },
};

export default userQuery;
