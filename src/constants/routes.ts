export const ROUTES = {
  // Dashboard
  DASHBOARD: "/",

  // Accounting routes
  ACCOUNTING: {
    DASHBOARD: "/accounting/dashboard",
    INVOICES: "/accounting/invoices",
    PARTNERS: "/accounting/partners",
    PRODUCTS: "/accounting/products",
    WAREHOUSES: "/accounting/warehouses",
    CASH: "/accounting/cash",
    DEPOSITS: "/accounting/deposits",
    SALES: "/accounting/sales",
    PURCHASES: "/accounting/purchases",
  },

  ADMIN: {
    // Customer routes
    CUSTOMER: {
      LIST: "/admin/customers",
      CREATE: "/admin/customers/new",
      // EDIT: (id: string) => `/admin/customers/${id}/edit`,
      // DETAIL: (id: string) => `/admin/customers/${id}`,
    },

    // Staff routes
    STAFF: {
      LIST: "/admin/staffs",
      CREATE: "/admin/staffs/new",
      // EDIT: (id: string) => `/admin/staffs/${id}/edit`,
      // DETAIL: (id: string) => `/admin/staffs/${id}`,
    },
  },

  // Auth routes
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },
} as const;
