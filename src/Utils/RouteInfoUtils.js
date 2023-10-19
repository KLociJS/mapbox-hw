const distanceConverter = (meters) => {
  return meters < 1000
    ? `${Math.round(meters)} m`
    : `${(meters / 1000).toFixed(1)} km`;
};

const durationConverter = (seconds) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds - 86400 * days) / 3600);
  const minutes = Math.floor((seconds - (86400 * days + 3600 * hours)) / 60);
  const secs = Math.floor(
    seconds - (86400 * days + 3600 * hours + 60 * minutes)
  );

  const daysText = `${days > 0 ? `${days} day ` : ""}`;
  const hoursText = `${hours > 0 || days > 0 ? `${hours} hour ` : ""}`;
  const minutesText = `${
    minutes > 0 || hours > 0 || days > 0 ? `${minutes} min ` : ""
  }`;
  const secondsText = `${secs} sec`;

  return `${daysText}${hoursText}${minutesText}${secondsText}`;
};

export { distanceConverter, durationConverter };
