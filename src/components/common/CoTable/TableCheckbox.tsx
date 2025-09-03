import { ChangeEvent } from "react";

interface ICheckboxProps {
  name: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export function TableCheckbox(props: ICheckboxProps) {
  const { onChange, checked, className } = props;

  return (
    <input
      className={`check-input ${className}`}
      checked={checked || false}
      type="checkbox"
      onChange={(e) => {
        if (onChange) onChange(e);
      }}
    />
  );
}
