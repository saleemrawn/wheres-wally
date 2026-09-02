const getSelectedCoordinates = (event) => {
  const container = event.currentTarget;
  const rect = container.getBoundingClientRect();

  return {
    x: event.clientX - rect.left + container.scrollLeft,
    y: event.clientY - rect.top + container.scrollTop,
  };
};

export { getSelectedCoordinates };
