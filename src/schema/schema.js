import { GraphQLID, GraphQLString, GraphQLSchema, GraphQLObjectType } from 'graphql';

const books = [{ id: '1', title: 'Book of Life', genre: 'Religion' }];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve: (parent, args) => {
        return books[0];
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
