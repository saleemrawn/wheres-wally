const getErrorDetails = (error) => {
  if (error?.response) {
    const code = error.response?.data?.code ?? error.response?.status ?? null;

    const message =
      error.response?.data?.message ??
      error.response?.statusText ??
      "Oops, something went wrong. Please try again later.";

    const errors = error.response?.data?.errors ?? null;

    return { code, message, errors };
  }

  if (error?.request) {
    return {
      code: null,
      message: "Network error. Please try again later.",
    };
  }

  return {
    code: null,
    message:
      error?.message ?? "Oops, something went wrong. Please try again later.",
  };
};

export { getErrorDetails };
