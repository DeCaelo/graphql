const{
  nodeDefinitions,
  fromGlobalId,
} = require('graphql-relay');
const { getObjectbyId } = require('./data');

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    return getObjectbyId(type.toLowerCase(), id);
  },
  (object) => {
    const { videoType } = require('../');
    if (object.title) {
      return videoType;
    }

    return null;
  }
);

exports.nodeInterface = nodeInterface;
exports.nodeField = nodeField;
