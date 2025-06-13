export const VALIDATION_PARTNER = {
  TAX_CODE: [
    { required: true },
    // {
    //   pattern: /^\d{10,13}$/,
    //   message: "Mã số thuế phải có 10-13 chữ số",
    // },
  ],

  PARTNER_CODE: [{ required: true }, { minLength: 3 }, { maxLength: 20 }],

  FULL_NAME: [{ required: true }, { minLength: 2 }, { maxLength: 100 }],

  PHONE_NUMBER: [
    { required: true },
    {
      // Số điện thoại phải bắt đầu bằng 0 và theo sau bởi 9,3,7,8 hoặc 5, tổng cộng 10 số
      pattern: /^(0)(9|3|7|8|5)[0-9]{8}$/,
      message: "Số điện thoại không hợp lệ",
    },
  ],

  WEBSITE_URL: [
    {
      pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
      message:
        "URL phải có định dạng hợp lệ (ví dụ: example.com hoặc https://example.com)",
    },
  ],
};

export const VALIDATION_EMPLOYEE = {
  EMPLOYEE_CODE: [{ required: true }, { minLength: 3 }, { maxLength: 20 }],

  FULL_NAME: [{ required: true }, { minLength: 2 }, { maxLength: 100 }],

  POSITION: [{ required: true }, { minLength: 2 }, { maxLength: 50 }],

  DOB: [{ required: true }],

  PHONE_NUMBER: [
    {
      pattern: /^[0-9]{10,11}$/,
      message: "Số điện thoại phải có 10-11 chữ số",
    },
  ],

  ID_CARD_NUMBER: [
    {
      pattern: /^[0-9]{9,12}$/,
      message: "Số CMND/CCCD phải có 9-12 chữ số",
    },
  ],
};
