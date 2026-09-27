import type { AxiosResponse } from "axios";
import axios from "./axios.js";

const api = {
  get: <T = unknown>(endpoint: string): Promise<AxiosResponse<T>> =>
    axios.get<T>(endpoint),

  post: <T = unknown, TBody = unknown>(
    endpoint: string,
    body?: TBody,
  ): Promise<AxiosResponse<T>> => axios.post<T>(endpoint, body),

  put: <T = unknown, TBody = unknown>(
    endpoint: string,
    body?: TBody,
  ): Promise<AxiosResponse<T>> => axios.put<T>(endpoint, body),

  delete: <T = unknown>(endpoint: string): Promise<AxiosResponse<T>> =>
    axios.delete<T>(endpoint),
};

export default api;
