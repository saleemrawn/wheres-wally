import axios from "axios";

interface TValidationError {
  type: string;
  value: unknown;
  msg: string;
  path: string;
  location: string;
}

interface TFormError {
  message: string;
  errors: TValidationError[];
}

interface TApiError {
  message: string;
  status: number;
  code?: string;
  errors?: unknown;
}

type TError = TApiError | TFormError;

class ErrorBase extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

class ApiError extends ErrorBase {
  status: number;
  code?: string;
  errors?: unknown;

  constructor(
    message: string,
    status: number,
    code?: string,
    errors?: unknown,
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}

class FormError extends ErrorBase {
  errors: TValidationError[];

  constructor(message: string, errors: TValidationError[] = []) {
    super(message);
    this.errors = errors;
  }
}

const isValidationError = (error: unknown): error is TValidationError[] => {
  return (
    Array.isArray(error) &&
    error.every(
      (item) =>
        typeof error === "object" &&
        item !== null &&
        "msg" in item &&
        "path" in item,
    )
  );
};

const getError = (error: unknown): TError => {
  if (error instanceof ApiError || error instanceof FormError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 0;
    const data = error.response?.data ?? undefined;
    const code = data?.code ?? error.code;
    const message = data?.message ?? error.message;
    const errors = data?.errors;

    if (code === "ECONNABORTED" || code === "ETIMEDOUT") {
      return new ApiError("Request timed out. Please try again.", status, code);
    }

    if (status === 400 && isValidationError(errors)) {
      return new FormError(error.message, errors);
    }

    return new ApiError(message, status, code, errors);
  }

  return new ApiError("Something went wrong", 500);
};

export { type TError, ApiError, FormError, getError };
