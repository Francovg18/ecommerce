import React from 'react';

const MapIframe = ({ mapUrl }) => {
  return (
    <iframe
      src={mapUrl}
      className="w-full h-40 rounded-lg"
      loading="lazy"
      title="Map"
    ></iframe>
  );
};

export default MapIframe;
