interface SuccessResponse<Data> {
  success: true;
  message?: string;
  data?: Data;
}

interface ErrorResponse<Errors = unknown> {
  success: false;
  message?: string;
  errors?: Errors;
}

type ApiResponse<Data, Errors = unknown> =
  | SuccessResponse<Data>
  | ErrorResponse<Errors>;

export type { ApiResponse };
