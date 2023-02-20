import React from 'react';

export default function Weather({ coord }) {
  return (
    <div>
      <h1>Latitude: {coord.lat}</h1>
      <h1>Longitude: {coord.lon}</h1>
    </div>
  );
}
