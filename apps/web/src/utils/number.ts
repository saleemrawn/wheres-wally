const getOrdinalSuffix = (number) => {
  let j = number % 10,
    k = number % 100;

  if (j === 1 && k !== 11) {
    return number + "st";
  }

  if (j === 2 && k !== 12) {
    return number + "nd";
  }

  if (j === 3 && k !== 13) {
    return number + "rd";
  }

  return number + "th";
};

const padZero = (num) => {
  return (num + "").length === 1 ? "0" + num : num + "";
};

const formatTime = (ms) => {
  const hours = padZero(Math.floor(ms / 3600000));
  const minutes = padZero(Math.floor(ms / 600000));
  const seconds = padZero(Math.floor(ms / 1000));

  return `${hours}:${minutes}:${seconds}`;
};

export { getOrdinalSuffix, padZero, formatTime };
