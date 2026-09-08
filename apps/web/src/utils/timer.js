const padZero = (num) => {
  return (num + "").length === 1 ? "0" + num : num + "";
};

export { padZero };
