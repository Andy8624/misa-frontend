import { useEffect, useRef, useState } from "react";

export const InputNumber: React.FC<{
  value: number | undefined;
  onChange?: (value: number) => void;
}> = ({ value, onChange }) => {
  const element = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState<string>("");

  const handleFocus = () => {
    setIsEdit(true);
    setTimeout(() => {
      element.current?.focus();
    }, 100);
  };

  useEffect(() => {
    // When external value changes, update the content string accordingly
    if (value !== undefined && value !== null) {
      setContent(value.toLocaleString("vi-VN"));
    } else {
      setContent("");
    }
  }, [value]);

  const handleChange = (inputValue: string) => {
    try {
      if (inputValue === "") {
        setContent("");
        if (onChange) {
          onChange(0);
        }
        return;
      }

      // Remove thousand separators (dots) used in Vietnamese format
      // e.g. "75.000" => "75000"
      let cleanedValue = inputValue.replace(/\./g, "");

      // Replace decimal commas with dots for parseFloat
      // e.g. "123,45" => "123.45"
      cleanedValue = cleanedValue.replace(/,/g, ".");

      // Validate input: only digits and at most one dot
      if (/[^0-9.]/.test(cleanedValue)) return;
      if ((cleanedValue.match(/\./g) || []).length > 1) return;

      const num = parseFloat(cleanedValue);

      if (isNaN(num)) {
        setContent("");
        if (onChange) onChange(0);
        return;
      }

      if (onChange) onChange(num);

      // Format number back to Vietnamese locale for display
      setContent(num.toLocaleString("vi-VN"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="min-h-6 w-full bg-white rounded-md">
        {/* Display mode */}
        <div
          className={`w-full h-10 flex items-center justify-end px-2.5 ${
            isEdit ? "hidden" : ""
          }`}
          onClick={handleFocus}
        >
          <p className="font-medium text-right">{content}</p>
        </div>

        {/* Edit mode */}
        <input
          value={content}
          ref={element}
          className={`w-full h-10 p-2 font-medium text-right ${
            !isEdit ? "hidden" : ""
          }`}
          onBlur={() => setIsEdit(false)}
          onChange={(e) => handleChange(e.target.value)}
          inputMode="decimal"
        />
      </div>
    </div>
  );
};
