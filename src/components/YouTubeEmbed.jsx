import React from 'react';

const YouTubeEmbed = ({ videoId }) => {
  return (
    <video
      controls
      width="640"
      height="360"
      src={`videos/${videoId}.mp4`}
      type="video/mp4"
    />
  );
};

export default YouTubeEmbed;