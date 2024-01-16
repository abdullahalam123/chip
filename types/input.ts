import React, { ChangeEvent } from "react";

export interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick: () => void;
  onBlur: () => void;
  placeholder: string;
  inputRef: React.RefObject<HTMLInputElement>;
}
