const getLocationCode = (lng, lat) => {
  return `${lng},${lat}.json`;
};

const getLocationCodes = (markers) => {
  return markers
    .reduce(
      (locations, currentLocation) =>
        currentLocation.lng !== null
          ? (locations += `${currentLocation.lng},${currentLocation.lat};`)
          : locations,
      ""
    )
    .slice(0, -1);
};

export { getLocationCode, getLocationCodes };
