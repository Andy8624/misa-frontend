export type Gender = "male" | "female" | "other";

export interface PaginatedResponse<T> {
  page: number;
  data: T[];
  pageSize: number;
  total: number;
}
