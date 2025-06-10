export const PURCHASE_VOUCHER_OPTION_PAYMENT_METHOD = {
  CASH: {
    value: "cash",
    translate: {
      vi: "Tiền mặt",
    },
  },
  PAYMENT_ORDER: {
    value: "payment-order",
    translate: {
      vi: "Ủy nhiệm chi",
    },
  },
  CHEQUE: {
    value: "cheque",
    translate: {
      vi: "Séc chuyển khoản",
    },
  },
  COUNTER_CHEQUE: {
    value: "counter-cheque",
    translate: {
      vi: "Séc tiền mặt",
    },
  },
};

export const PURCHASE_VOUCHER_OPTION_INVOICE_INCLUSION = {
  RECEIVED_WITH_INVOICE: {
    value: "received-with-invoice",
    translate: {
      vi: "Nhận kèm hoá đơn",
    },
  },
  RECEIVED_WITHOUT_INVOICE: {
    value: "received-without-invoice",
    translate: {
      vi: "Không kèm hoá đơn",
    },
  },
  NO_INVOICE: {
    value: "no-invoice",
    translate: {
      vi: "Không có hoá đơn",
    },
  },
};

export const PURCHASE_VOUCHER_OPTION_PAYMENT_STATUS = {
  NO_PAID: {
    value: "not-paid",
    translate: {
      vi: "Chưa thanh toán",
    },
  },
  PAID_NOW: {
    value: "pay-now",
    translate: {
      vi: "Thanh toán ngay",
    },
  },
};

export const PURCHASE_VOUCHER_TAB = {
  RECEIVING_VOUCHER: {
    value: "receiving-voucher",
    translate: {
      vi: "Phiếu nhập",
    },
  },
  INVOICE: {
    value: "invoice",
    translate: {
      vi: "Hoá đơn",
    },
  },
  PAYMENT_VOUCHER: {
    value: "payment-voucher",
    translate: {
      vi: "Phiếu chi",
    },
  },
  DEBIT_NOTE: {
    value: "debit-note",
    translate: {
      vi: "Chứng từ ghi nợ",
    },
  },
  PAYMENT_ORDER: {
    value: "payment-order",
    translate: {
      vi: "Uỷ nhiệm chi",
    },
  },
  CHEQUE: {
    value: "cheque",
    translate: {
      vi: "Séc chuyển khoảng",
    },
  },
  COUNTER_CHEQUE: {
    value: "counter_cheque",
    translate: {
      vi: "Séc tiền mặt",
    },
  },
};

// export const OPTION_PURCHASE_TYPE = {
//   DOMESTIC_PURCHASE_WITH_STOCK_RECEIPT: {
//     value: "domestic-purchase-with-stock-receipt",
//     translate: {
//       vi: "Mua hàng trong nước nhập kho",
//     },
//   },
//   DOMESTIC_PURCHASE_WITHOUT_STOCK_RECEIPT: {
//     value: "domestic-purchase-without-stock-receipt",
//     translate: {
//       vi: "Mua hàng trong nước không qua kho",
//     },
//   },
//   IMPORTED_PURCHASE_WITH_STOCK_RECEIPT: {
//     value: "imported-purchase-with-stock-receipt",
//     translate: {
//       vi: "Mua hàng nhập khẩu nhập kho",
//     },
//   },
//   IMPORTED_PURCHASE_WITHOUT_STOCK_RECEIPT: {
//     value: "imported-purchase-without-stock-receipt",
//     translate: {
//       vi: "Mua hàng nhập khẩu không qua kho",
//     },
//   },
// };

export const OPTION_PURCHASE_TYPE = {
  INVENTORY_IN_DOMESTIC_GOODS: {
    value: "inventory-in-domestic-goods",
    translate: {
      vi: "Mua hàng trong nước nhập kho",
    },
  },
  PURCHASE_OF_DOMESTIC_GOODS_NO_INVENTORY_INVOLVED: {
    value: "purchase-of-domestic-goods-no-inventory-involved",
    translate: {
      vi: "Mua hàng trong nước không qua kho",
    },
  },
  INVENTORY_IN_IMPORTED_GOODS: {
    value: "inventory-in-imported-goods",
    translate: {
      vi: "Mua hàng nhập khẩu nhập kho",
    },
  },
  PURCHASE_OF_IMPORTED_GOODS_NO_INVENTORY_INVOLVED: {
    value: "purchase-of-imported-goods-no-inventory-involved",
    translate: {
      vi: "Mua hàng nhập khẩu không qua kho",
    },
  },
};

export const OPTION_INVENTORY_IN_VOUCHER_TYPE = {
  MANUFACTURED_GOODS: {
    value: "manufactured-goods",
    translate: {
      vi: "Thành phẩm sản xuất",
    },
  },
  SALES_RETURNS: {
    value: "sales-returns",
    translate: {
      vi: "Hàng bán bị trả lại",
    },
  },
  OTHERS: {
    value: "others",
    translate: {
      vi: "Khác (NVL thừa, HH thuê gia công, ...)",
    },
  },
};

export const OPTION_COST_OF_INVENTORY_RETURNED = {
  USED_WEIGHTED_AVERAGE_COST: {
    value: "used-weighted-average-cost",
    translate: {
      vi: "Lấy từ đơn giá BQCK",
    },
  },
  ENTER_COST_BY_HAND: {
    value: "enter-cost-by-hand",
    translate: {
      vi: "Nhập đơn giá bằng tay",
    },
  },
};

export const OPTION_INVENTORY_OUT_VOUCHER_TYPE = {
  SALES: {
    value: "sales",
    translate: {
      vi: "Bán hàng",
    },
  },
  PRODUCTION: {
    value: "production",
    translate: {
      vi: "Sản xuất",
    },
  },
  OTHERS: {
    value: "others",
    translate: {
      vi: "Khác (Xuất sử dụng, góp vốn, ...)",
    },
  },
};

export const OPTION_CASH_RECEIPT_VOUCHER_TYPE = {
  CASH_RECEIPT_FROM_CUSTOMER: {
    value: "cash-receipt-from-customer",
    translate: {
      vi: "Thu tiền khách hàng (không theo hóa đơn)",
    },
  },
  RECEIPT_FROM_COLLECTING_ADVANCE_FROM_EMPLOYEE: {
    value: "receipt-from-collecting-advance-from-employee",
    translate: {
      vi: "Thu hoàn ứng nhân viên",
    },
  },
  CASH_RECEIPT_FROM_COLLECTING_DEPOSIT: {
    value: "cash-receipt-from-collecting-deposit",
    translate: {
      vi: "Rút tiền gửi về nhập quỹ",
    },
  },
  OTHERS: {
    value: "other",
    translate: {
      vi: "Thu khác",
    },
  },
};

export const OPTION_CASH_PAYMENT_VOUCHER_TYPE = {
  PAYMENT_TO_SUPPLIER: {
    value: "payment-to-supplier",
    translate: {
      vi: "Trả tiền nhà cung cấp (không theo hóa đơn)",
    },
  },
  ADVANCE_TO_EMPLOYEE: {
    value: "advance-to-employee",
    translate: {
      vi: "Tạm ứng cho nhân viên",
    },
  },
  PAYMENT_TO_SERVICE_INVOICE: {
    value: "payment-to-service-invoice",
    translate: {
      vi: "Chi mua ngoài có hóa đơn",
    },
  },
  DEPOSIT_TO_BANK_ACCOUNT: {
    value: "deposit-to-bank-account",
    translate: {
      vi: "Gửi tiền vào ngân hàng",
    },
  },
  OTHERS: {
    value: "  ",
    translate: {
      vi: "Chi khác",
    },
  },
};

export const OPTION_TAB_CASH = {
  WELCOME: "welcome",
  CASH_RECEIPT: "cash-receipt",
  CASH_PAYMENT: "cash-payment",
};

export const OPTION_TAB_BA_DEPOSIT = {
  WELCOME: "welcome",
  CASH_RECEIPT: "cash-receipt",
  CASH_PAYMENT: "cash-payment",
};

export const OPTION_BA_DEPOSIT_RECEIPT_VOUCHER_TYPE = {
  CASH_RECEIPT_FROM_CUSTOMER: {
    value: "cash-receipt-from-customer",
    translate: {
      vi: "Thu tiền khách hàng (không theo hóa đơn)",
    },
  },
  RECEIPT_FROM_COLLECTING_ADVANCE_FROM_EMPLOYEE: {
    value: "receipt-from-collecting-advance-from-employee",
    translate: {
      vi: "Thu hoàn ứng nhân viên",
    },
  },
  RECEIPT_FROM_FINANCIAL_INVESTMENT_INTEREST: {
    value: "receipt-from-financial-investment-interest",
    translate: {
      vi: "Thu lãi đầu tư tài chính",
    },
  },
  RECEIPT_FROM_BORROWING: {
    value: "receipt-from-borrowing",
    translate: {
      vi: "Thu tiền vay qua ngân hàng",
    },
  },
  RECEIPT_FROM_TAX_REBATE: {
    value: "receipt-from-tax-rebate",
    translate: {
      vi: "Thu hoàn thuế GTGT",
    },
  },
  OTHERS: {
    value: "other",
    translate: {
      vi: "Thu khác",
    },
  },
};

export const OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_TYPE = {
  PAYMENT_TO_SUPPLIER: {
    value: "payment-to-supplier",
    translate: {
      vi: "Trả tiền nhà cung cấp (không theo hóa đơn)",
    },
  },
  PAYMENT_TO_BORROWINGS: {
    value: "payment-to-borrowings",
    translate: {
      vi: "Trả các khoản vay",
    },
  },
  ADVANCE_TO_EMPLOYEE: {
    value: "advance-to-employee",
    translate: {
      vi: "Tạm ứng cho nhân viên",
    },
  },
  PAYMENT_TO_SERVICE_INVOICE: {
    value: "payment-to-service-invoice",
    translate: {
      vi: "Chi mua ngoài có hóa đơn",
    },
  },
  OTHERS: {
    value: "other",
    translate: {
      vi: "Thu khác",
    },
  },
};

export const OPTION_BA_WITHDRAW_PAYMENT_VOUCHER_METHOD = {
  PAYMENT_ORDER: {
    value: "payment-order",
    translate: {
      vi: "Ủy nhiệm chi",
    },
  },
  CHEQUE: {
    value: "cheque",
    translate: {
      vi: "Séc chuyển khoản",
    },
  },
  COUNTER_CHEQUE: {
    value: "counter-cheque",
    translate: {
      vi: "Séc tiền mặt",
    },
  },
};
export const OPTION_SA_SERVICE_PAYMENT_STATUS = {
  ON_CREDIT: {
    value: "on-credit",
    translate: {
      vi: "Chưa thu tiền",
    },
  },
  PAID: {
    value: "paid",
    translate: {
      vi: "Thu tiền ngay",
    },
  },
};

export const OPTIONS_SA_SERVICE_DISCOUNT = {
  NO: {
    value: "no",
    translate: {
      vi: "Không chiết khấu",
    },
  },
  ITEMS: {
    value: "items",
    translate: {
      vi: "Theo mặt hàng",
    },
  },
  PERCENT_INVOICE_VALUE: {
    value: "percent_invoice_value",
    translate: {
      vi: "Theo % hoá đơn",
    },
  },
  INVOICE_VALUE: {
    value: "invoice_value",
    translate: {
      vi: "Theo số tiền trên tổng háo đơn",
    },
  },
};

export const OPTION_SA_SERVICE_PAYMENT_METHOD = {
  CASH: {
    value: "cash",
    translate: {
      vi: "Tiền mặt",
    },
  },
  DEPOSIT: {
    value: "  ",
    translate: {
      vi: "Chuyển khoản",
    },
  },
};

export const OPTION_SA_VOUCHER_SALES_TYPE = {
  DOMESTIC_GOODS_SALES: {
    value: "domestic-goods-sales",
    translate: {
      vi: "Bán hàng hoá trong nước",
      en: "Sales of domestic goods",
    },
  },
  EXPORTED_GOODS_SALES: {
    value: "exported-goods-sales",
    translate: {
      vi: "Bán hàng xuất khẩu",
      en: "Sales of exported goods",
    },
  },
  CONSIGNMENT_SALES: {
    value: "consignment-sales",
    translate: {
      vi: "Bán hàng đại lý bán đúng giá",
      en: "Consignment sales",
    },
  },
  ENTRUSTED_EXPORT_SERVICE_SALES: {
    value: "entrusted-export-service-sales",
    translate: {
      vi: "Bán hàng uỷ thác xuất khẩu",
      en: "Sales of Entrusted export service",
    },
  },
};

export const OPTION_SA_VOUCHER_PAYMENT_STATUS = {
  ON_CREDIT: {
    value: "on-credit",
    translate: {
      vi: "Chưa thu tiền",
    },
  },
  PAID: {
    value: "paid",
    translate: {
      vi: "Thu tiền ngay",
    },
  },
};

export const OPTION_SA_VOUCHER_PAYMENT_METHOD = {
  CASH: {
    value: "cash",
    translate: {
      vi: "Tiền mặt",
    },
  },
  DEPOSIT: {
    value: "  ",
    translate: {
      vi: "Chuyển khoản",
    },
  },
};

export const OPTIONS_DISCOUNT = {
  NO: {
    value: "no",
    translate: {
      vi: "Không chiết khấu",
    },
  },
  ITEMS: {
    value: "items",
    translate: {
      vi: "Theo mặt hàng",
    },
  },
  PERCENT_INVOICE_VALUE: {
    value: "percent_invoice_value",
    translate: {
      vi: "Theo % hoá đơn",
    },
  },
  INVOICE_VALUE: {
    value: "invoice_value",
    translate: {
      vi: "Theo số tiền trên tổng háo đơn",
    },
  },
};
