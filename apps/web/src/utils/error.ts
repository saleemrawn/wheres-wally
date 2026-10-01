import axios from "axios";

interface ErrorResponseData {
  message: string;
  status?: number | null;
  code?: string | null;
  errors?: unknown;
}

class ApiError extends Error {
  status: number | null;
  code: string | null;
  errors?: unknown;

  constructor({
    message,
    status = null,
    code = null,
    errors,
  }: ErrorResponseData) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}

const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error) && error.response?.data) {
    const { message, code, errors } = error.response.data;
    return new ApiError({
      message: message ?? error.message,
      status: error.response.status,
      code,
      errors,
    });
  }

  if (error instanceof Error) {
    return new ApiError({ message: error.message });
  }

  return new ApiError({ message: "An unexpected error occurred." });
};

export { ApiError, handleApiError };
