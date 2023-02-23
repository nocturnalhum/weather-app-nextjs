const getCardinalDirection = (deg) => {
  const cardinal = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
    'N',
  ];
  if (deg < 0 || deg > 360) {
    console.error('Degree value must be between 0 and 360');
    return;
  }
  if (deg % 22.5 === 0) {
    return cardinal[deg / 22.5];
  }
  return cardinal[Math.ceil(deg / 45) + Math.floor(deg / 45)];
};

export default getCardinalDirection;
