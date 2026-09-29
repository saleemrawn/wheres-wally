interface ValidationError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors: ValidationError[];
}

export type { ApiErrorResponse, ValidationError };
