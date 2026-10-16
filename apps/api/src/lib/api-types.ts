interface ApiResponse<Data> {
  success: boolean;
  message?: string;
  data?: Data;
  errors?: unknown;
}

export type { ApiResponse };
