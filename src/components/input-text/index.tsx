import { useEffect, useRef, useState } from "react";

export const InputText: React.FC<{
  value: string | undefined;
  onChange?: any;
}> = ({ value, onChange }) => {
  const element = useRef<any>(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleFocus = () => {
    if (!isEdit) {
      setIsEdit(true);
      setTimeout(() => {
        element.current.focus();
      }, 100);
    }
  };

  const autoResize = () => {
    element.current.style.height = "auto";
    element.current.style.height = `${element.current.scrollHeight}px`;
  };

  const handleOnChange = (value: string | undefined) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div>
      <div
        className="min-h-6 w-full bg-white rounded-md"
        onClick={() => handleFocus()}
      >
        <div
          className={`w-full h-full min-h-10 flex items-center px-2.5 ${
            isEdit && "hidden"
          }`}
        >
          <p>{value}</p>
        </div>
        <textarea
          value={value}
          onInput={autoResize}
          ref={element}
          className={`w-full h-full p-2 rounded-sm ${!isEdit && "hidden"}`}
          onBlur={() => setIsEdit(false)}
          onChange={(e) => handleOnChange(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};
