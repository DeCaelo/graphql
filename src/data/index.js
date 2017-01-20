const videoA = {
  id: () => 'a',
  title: () => 'Create a GraphQL Schema',
  duration: () => 120,
  watched: () => true,
};

const videoB = {
  id: () => 'b',
  title: () => 'Ember.js CLI',
  duration: () => 240,
  watched: () => false,
};

const videos = [videoA, videoB];

const getVideoById = (id) => new Promise((resolve) => {
  const [video] = videos.filter((video) => {
    return video.id === id;
});

  resolve(video);
});

const getVideos = () => new Promise((resolve) => resolve(videos));

const createVideo = ({ title, duration, watched }) => {
  const video = {
    id: (new Buffer(title, 'utf8')).toString('base64'),
    title,
    duration,
    watched,
  };

  videos.push(video);

  return video;

};

exports.getVideoById = getVideoById;
exports.getVideos = getVideos;
exports.createVideo= createVideo;
