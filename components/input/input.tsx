import { InputProps } from "@/types/input";

export const Input = ({
  value,
  onChange,
  onKeyDown,
  onClick,
  onBlur,
  placeholder,
  inputRef,
}: InputProps) => {
  return (
    <input
      ref={inputRef}
      onKeyDown={onKeyDown}
      onClick={onClick}
      onBlur={onBlur}
      value={value}
      onChange={onChange}
      type="text"
      placeholder={placeholder}
      required
      className="ml-3 w-[7.5rem] bg-transparent text-black focus:outline-none"
    />
  );
};
