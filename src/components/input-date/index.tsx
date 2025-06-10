import { DatePicker, DatePickerProps } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs"; // Import dayjs

export const InputDate: React.FC<{
  value: string | undefined;
  onChange?: any;
  title: string;
}> = ({ value, onChange, title }) => {
  const [dateValue, setDateValue] = useState<any>();
  const handleChange: DatePickerProps["onChange"] = (date) => {
    if (onChange) {
      onChange(
        `${date.get("year")}-${
          Number(date.get("month")) + 1 < 10
            ? "0" + (Number(date.get("month")) + 1)
            : Number(date.get("month")) + 1
        }-${
          Number(date.get("date")) < 10
            ? "0" + date.get("date")
            : date.get("date")
        }`
      );
    }
  };
  useEffect(() => {
    if (value) {
      const nowDate = new Date(value);
      const date =
        nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
      const month =
        nowDate.getMonth() + 1 < 10
          ? "0" + (nowDate.getMonth() + 1)
          : nowDate.getMonth() + 1;
      const fullYear = nowDate.getFullYear();
      setDateValue(dayjs(`${date}/${month}/${fullYear}`, "DD/MM/YYYY"));
    }
  }, [value]);
  return (
    <div>
      <p className="font-semibold">{title}</p>
      <div className="h-10 w-full outline-none border rounded-md">
        <DatePicker
          onChange={handleChange}
          format="DD/MM/YYYY"
          variant="borderless"
          value={dateValue}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};
