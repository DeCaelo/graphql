const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
 } = require('graphql');
 const { getVideoById, getVideos, createVideo } = require('./src/data');

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A video on Egghead.io',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The id of the video',
    },
    title: {
      type: GraphQLString,
      description: 'The title of the video.',
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video (in seconds).',
    },
    watched: {
      type: GraphQLBoolean,
      description: 'Whether or not the viewer has watched the video.',
    },
  },
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'the root query type.',
  fields: {
    videos: {
      type: new GraphQLList(videoType),
      resolve: getVideos,
    },
    video: {
      type: videoType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'the ID of the video.',
        },
      },
      resolve: (_, args) => {
        return getVideoById(args.id);
      },
    },
  },
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root Mutation Type.',
  fields: {
    createVideo: {
      type: videoType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The title of the video.',
        },
        duration: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'The duration of the video (in seconds).',
        },
        watched: {
          type: new GraphQLNonNull(GraphQLBoolean),
          description: 'Whether or not the viewer has watched the video.',
        },
      },
      resolve: (_, args) => {
        return createVideo(args);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}/graphql`);
});
