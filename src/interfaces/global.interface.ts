export type Gender = "male" | "female" | "other";

// Phân trang
export interface PaginatedResponse<T> {
  page: number;
  data: T[];
  pageSize: number;
  total: number;
}

// Global validate
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  rules: ValidationRule[];
}

export type ValidationResult = {
  isValid: boolean;
  errors: { [key: string]: string[] };
};
